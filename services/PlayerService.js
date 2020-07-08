const firebaseConfig = require('../config/FirebaseConfig')

exports.addPlayer = function addPlayer(username,status,profileIcon){
   firebaseConfig.db.collection('players').doc()
            .create({
                username : username,
                role: '',
                status: status,
                profileIcon: profileIcon
            })
    }

exports.getPlayerByUsername = function getPlayerByUsername(username){
       return firebaseConfig.db.collection('players').where("username","==",username);
}


exports.getAllPlayers = function getAllPlayers(){
       return  firebaseConfig.db.collection('players');
}


exports.updatePlayer= function(id,username,status,profileIcon,role) {
       const document = firebaseConfig.db.collection('players').doc(id);
       document.update({
              username:username,
              status:status,
              profileIcon: profileIcon,
              role: role
       });
}

exports.deletePlayer = function deletePlayer(id){
       const document = firebaseConfig.db.collection('players').doc(id);
       document.delete();
}
