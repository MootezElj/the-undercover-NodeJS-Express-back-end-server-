const firebaseConfig = require('../config/FirebaseConfig');

exports.createRoom = function createRoom(owner, status, maxPlayers,
       name, nbPlayers, password) {
       room = {
              creationDate: Date(),
              joinId: owner.username.substr(1, 1) + Math.random().toString(36).substr(3, 5),
              status: status,
              maxPlayers: maxPlayers,
              name: name,
              nbPlayers: nbPlayers,
              owner: owner,
              password: password,
              chosenWords:[],
              players: [{
                     id: owner.id,
                     username: owner.username,
                     isReady: false
              }],
              allPlayersReady: false
       };
       firebaseConfig.db.collection('rooms').doc()
              .create(room);
       return room;
}

exports.getRoomByJoinId = function getRoomByJoinId(roomJoinId) {
       return firebaseConfig.db.collection('rooms').where("joinId", "==", roomJoinId);
}

exports.getRoomByOwnerUsername = function getRoomByOwnerUsername(username) {
       return firebaseConfig.db.collection('rooms').where("owner.username", "==", username);
}

exports.getRoomByOwnerUsername = function getRoomByOwnerUsername(username) {
       return firebaseConfig.db.collection('rooms').where("owner.username", "==", username);
}

exports.getAllRooms = function getAllRooms() {
       return firebaseConfig.db.collection('rooms');
}


exports.updateRoom = function updateRoom(id, status, maxPlayers, name, nbPlayers, ownerUsername, password) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.update({
              status: status,
              maxPlayers: maxPlayers,
              name: name,
              nbPlayers: nbPlayers,
              owner: ownerUsername,
              password: password
       });
}

exports.updatePlayerReadyUnready = async function updatePlayerReadyUnready(playerId,isReady, playerUsername, roomId) {
       const document = firebaseConfig.db.collection('rooms').doc(roomId);
       document.update({
              players: firebaseConfig.FieldValue.arrayRemove({ id:playerId,username: playerUsername, isReady: !isReady })
       });
       document.update({
              players: firebaseConfig.FieldValue.arrayUnion({  id:playerId,username: playerUsername, isReady: isReady })
       });
}

exports.addPlayerToRoom = function addPlayerToRoom(playerId,roomId, username) {
       const document = firebaseConfig.db.collection('rooms').doc(roomId);
       document.update({
              players: firebaseConfig.FieldValue.arrayUnion({  id:playerId,username: username, isReady: false })
       }).then(res => {
              console.log(res, ' removed');
       });
}

exports.removePlayerFromRoom = function removePlayerFromRoom(playerId,roomId, username) {
       const document = firebaseConfig.db.collection('rooms').doc(roomId);
       document.update({
              players: firebaseConfig.FieldValue.arrayRemove({  id:playerId,username: username, isReady: true })
       });
       document.update({
              players: firebaseConfig.FieldValue.arrayRemove({  id:playerId,username: username, isReady: false })
       });
}

exports.updateRoomStatus = function updateRoomStatus(id, status) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.update({
              status: status,
       });
}

exports.updateRoomStatusAndChosenWord = function updateRoomStatusAndChosenWord(id, status,chosenWord) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.update({
              status: status,
              chosenWords: firebaseConfig.FieldValue.arrayUnion({id:chosenWord}),
              chosenWord: chosenWord,
              round:1
       });
}


exports.allPlayersReady = function allPlayersReady(id) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.update({
              allPlayersReady: true,
              status: 'Ready'
       });
}

exports.allPlayersNotReady = function allPlayersNotReady(id) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.update({
              allPlayersReady: false,
              status: 'Waiting'
       });
}

exports.deleteRoom = function deleteRoom(id) {
       const document = firebaseConfig.db.collection('rooms').doc(id);
       document.delete();
}



