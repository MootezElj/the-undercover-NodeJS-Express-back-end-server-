//const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("../the-undercover-game-firebase-adminsdk-3nm90-755dd97eea.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-undercover-game.firebaseio.com"
});
const db = admin.firestore();

exports.db = db;

// exports the api to firebase cloud functions
//exports.app = functions.https.onRequest(app);