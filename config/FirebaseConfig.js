//const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("../the-undercover-game-firebase-adminsdk-3nm90-755dd97eea.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-undercover-game.firebaseio.com"
});
const db = admin.firestore();
admin.firestore().settings({ignoreUndefinedProperties:true});

exports.db = db;
exports.FieldValue = admin.firestore.FieldValue;
exports.FieldPath = admin.firestore.FieldPath;
// exports the api to firebase cloud functions
//exports.app = functions.https.onRequest(app);