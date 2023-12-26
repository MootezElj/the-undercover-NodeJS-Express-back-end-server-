//const functions = require('firebase-functions');
const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
    "project_id": "the-undercover-game",
    "private_key_id": process.env['FIREBASE_PRIVATE_KEY_ID'],
    "private_key": process.env['FIREBASE_PRIVATE_KEY'],
    "client_email": process.env['FIREBASE_CLIENT_EMAIL'],
    "client_id": process.env['FIREBASE_CLIENT_ID'],
    "auth_uri": process.env['FIREBASE_AUTH_URI'],
    "token_uri": process.env['FIREBASE_TOKEN_URI'],
    "auth_provider_x509_cert_url": process.env['FIREBASE_AUTH_PROVIDER_X509_CERT_URL'],
    "client_x509_cert_url": process.env['FIREBASE_CLIENT_X509_CERT_URL']

}

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
