const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// const cc = {
// 	role: "Admin"
// }

// admin.auth().createCustomToken("gkvit4", cc).then((user) => {
// 	console.log("User", user);
// })

// admin.auth().createUser()

module.exports = admin;
