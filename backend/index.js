const mongoose = require('mongoose');
// schemas
const reward = require('./schema_models/reward.js');
const user = require('./schema_models/user.js');
const address = require('./schema_models/address.js');
const order = require('./schema_models/order.js');

const { WebSocket } = require('ws');

const wss = new WebSocket.Server({ port: 3001 })

// Listen for connections from clients
wss.on('connection', ws => {
	connectToDB().catch(err => console.log(err));

	// Listen for messages from connected client
	ws.on('message', message => {
		const data = JSON.parse(message) // Parsing data to JSON

		// retrieving rewards data from DB
		if(data.function == 'getRewards') {
			reward.find({}, function (err, doc) {
				ws.send(JSON.stringify({function: 'rewards', doc}));
			})
		// retrieve user from DB
		} else if(data.function == 'getUser') {
			getWholeUser(data).then(doc => {
				ws.send(JSON.stringify({function: 'getUser', doc}));
			})
		// write user to DB
		} else if(data.function == 'writeUser') {
			writeWholeUser(data).then(toSend => {
				ws.send(JSON.stringify(toSend));
			});
		} else if(data.function == 'writeAddress') {
			saveAddressToDB(data);
		} else if(data.function == 'getEmailAvailable') {
			user.findOne({'userID': data.userID}, function (err, doc) {
				let retDoc = {};
				retDoc.function = 'getEmailAvailable';
				if(doc) {
					retDoc.doc = false;
				} else {
					retDoc.doc = true;
				}
				ws.send(JSON.stringify(retDoc));
			})
		} else if(data.function == 'writePassword') {
			writePassword(data);
		} else if(data.function == 'addOrder') {
			// write order to DB
			writeOrder(data).then(id => {
				// add the  new orderID to user's orders
				updateUserOrders(data, id);
			});
		} else if(data.function == 'getOrders') {
			getOrders(data).then(orders => {
				ws.send(JSON.stringify({function: 'getOrders', doc: orders}));
			});
		}
	})
})

async function connectToDB() {
	await mongoose.connect('mongodb+srv://bjkore:NYHRRM2LYxJnCdr6@214groupproject.2fj4w.mongodb.net/214_data');
}

async function getOrders(data) {
	let userOrders = (await user.findOne({ userID: data.userID }, 'orders')).orders;

	const orders = [];

    await Promise.all(userOrders.map(async orderID => {
        let oneOrder = await order.findOne({ _id: orderID});
        orders.push(oneOrder);
    }));

	return orders;
}

async function updateUserOrders(data, id) {
	await user.findOne({ userID: data.userID }).exec().then(theUser => {
		theUser.orders.push(id);
		theUser.points -= data.total;
		console.log(data)
		console.log(theUser)
		theUser.save();
	});
}

async function writeOrder(data) {
	const orderObj = new order({ date: data.date, items: data.items });
	return (await orderObj.save())._id;
}

async function getWholeUser(data) {
	let doc = await user.findOne({'userID': data.userID, 'password': data.password});
	// if not found then return false
	if(!doc) {
		return false;
	}

	// assign address from DB
	let addressMailing = JSON.parse(JSON.stringify(await address.findById(doc.addressMailing).exec()));

	// assign address from DB
	let addressBilling = JSON.parse(JSON.stringify(await address.findById(doc.addressBilling).exec()));

	return {...JSON.parse(JSON.stringify(doc)), addressBilling, addressMailing};
}

async function writeWholeUser(data) {
	// split the data
	let addressMailing = data.addressMailing;
	let addressBilling = data.addressBilling;

	// remove the address info
	data.addressMailing = 0;
	data.addressBilling = 0;

	let doc = {...data};

	// check if mailing address is already in DB
	let address1 = await address.findOne({ 'streetAddress': addressMailing.streetAddress,
						'postcode': addressMailing.postcode,'state': addressMailing.state });
	if(address1) {
		doc.addressMailing = address1._id;
	} else {	// add if it isn't already in DB
		const addObj = new address(addressMailing);
		doc.addressMailing = (await addObj.save())._id;
	}

	// check if billing address is already in DB
	let address2 = await address.findOne({ 'streetAddress': addressBilling.streetAddress,
						'postcode': addressBilling.postcode,'state': addressBilling.state });
	if(address2) {
		doc.addressBilling = address2._id;
	} else {	// add if it isn't already in DB
		const addObj = new address(addressBilling);
		doc.addressBilling = (await addObj.save())._id;
	}

	// randomly assign tier and points
	doc.points = Math.floor(Math.random() * (5000 - 500) + 500);	// 20 to 5000 points
	doc.rewardTier = Math.floor(Math.random() * 4);	// 0 to 3
	doc.tierProgress = doc.rewardTier === 3 ? 100 : Math.floor(Math.random() * 100 + 1) // 1 to 100
	doc.nextTier = (doc.rewardTier >= 3) ? 3 : (doc.rewardTier+1);	// use numerical rewardTier to find next tier

	// write user
	let thisUser = new user(doc);
	await thisUser.save();

	doc.addressMailing = await address.findById(doc.addressMailing);
	doc.addressBilling = await address.findById(doc.addressBilling);

	return {function: 'writeUser', doc};
}

async function writePassword(data) {
	const updatePassword = { password: data.newPassword };
	const filter = { userID: data.userID, password: data.password };

	await user.findOneAndUpdate(filter, updatePassword);
}

async function saveAddressToDB(data) {
	// create the address from given data
	let doc = {};
	doc.streetAddress = data.streetAddress; // string because it might be 'unit 3/182' for example
    doc.postcode = data.postcode;
    doc.state = data.state;

	const addressObj = new address(doc);

	// save to DB
	await addressObj.save();
}