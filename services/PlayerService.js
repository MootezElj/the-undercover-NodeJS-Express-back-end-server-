const firebaseConfig = require('../config/FirebaseConfig')

exports.addPlayer = function addPlayer(username,status,profileIcon,password,email){
   firebaseConfig.db.collection('players').doc()
            .create({
                username : username,
                email:email,
                role: '',
                status: status,
                profileIcon: profileIcon,
                password: password,
                sessionId:null,
                word:'',
                isUndercover:false,
                isMrWhite:false,
                wordIcon:''
            })
    }

exports.getPlayerByUsername = function getPlayerByUsername(username){
       return firebaseConfig.db.collection('players').where("username","==",username);
}


exports.getAllPlayers = function getAllPlayers(){
       return  firebaseConfig.db.collection('players');
}

exports.updatePlayer= function(id,username,status,profileIcon,role,password,sessionId) {
       const document = firebaseConfig.db.collection('players').doc(id);
       document.update({
              username:username,
              status:status,
              profileIcon: profileIcon,
              role: role,
              password: password,
              sessionId:sessionId
       });
}

exports.updatePlayerRoleAndWord= function updatePlayerRoleAndWord(id,isUndercover,isMrWhite,word,wordIcon) {
       
       const document = firebaseConfig.db.collection('players').doc(id);
      
       document.update({
              isMrWhite:isMrWhite,
              isUndercover:isUndercover,
              word:word,
              wordIcon:wordIcon
       });
}

exports.updatePlayerSessionId= function(id,sessionId,status) {
       const document = firebaseConfig.db.collection('players').doc(id);
       document.update({
              sessionId:sessionId,
              status:status
       });
}


exports.deletePlayer = function deletePlayer(id){
       const document = firebaseConfig.db.collection('players').doc(id);
       document.delete();
}
