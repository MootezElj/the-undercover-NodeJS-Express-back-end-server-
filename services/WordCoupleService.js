const firebaseConfig = require('../config/FirebaseConfig');

exports.createWordCouple = function createWordCouple(standardWord,undercoverWord,icon,undercoverIcon) {
       wordCouple = {
              standardWord:standardWord,
              undercoverWord:undercoverWord,
              standardWordIcon:icon,
              undercoverWordIcon:undercoverIcon
       };
       firebaseConfig.db.collection('wordCouples').doc()
              .create(wordCouple);
       return wordCouple;
}

exports.getAllWordCouples = function getAllWordCouples() {
       return firebaseConfig.db.collection('wordCouples');
}





