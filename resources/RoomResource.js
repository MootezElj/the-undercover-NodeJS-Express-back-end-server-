const roomService = require('../services/RoomService');
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    (async () => {
        try {
            if ((await roomService.getRoomByOwnerUsername(req.body.owner.username).get()).size==0 )
            {
            room = await roomService.createRoom(req.body.owner,'New',req.body.maxPlayers,req.body.name
                ,1,req.body.password)
            return res.status(200).send(room);
            }
            return res.status(412).send("User already have a room");
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

router.get('/joinId/:joinId', (req, res) => {
    (async () => {
        try {
            var docRef = roomService.getRoomByJoinId(req.params.joinId).get();
            docRef.then(function(querySnapshot){
                console.log('In query')
                    if (querySnapshot.size==0){
                        throw new Error('Room with joinId ' +req.params.joinId +' does not exist')
                    }
                       querySnapshot.forEach(function(doc){
                               data = doc.data();
                               data.id = doc.id;
                               return res.status(200).send(data);
                       });
                       
               })
               .catch(function(error){
                       console.log("Error getting document :", error);
                       return res.status(404).send('Room not found');
               });  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})


router.get('/owner/:username', (req, res) => {
    (async () => {
        try {
            var docRef = roomService.getRoomByOwnerUsername(req.params.username).get();
            docRef.then(function(querySnapshot){
                console.log('In query')
                    if (querySnapshot.size==0){
                        throw new Error('Room with joinId ' +req.params.joinId +' does not exist')
                    }
                       querySnapshot.forEach(function(doc){
                               data = doc.data();
                               data.id = doc.id;
                               console.log('In query',doc)
                               return res.status(200).send(data);
                              
                       });
               })
               .catch(function(error){
                       console.log("Error getting document :", error);
                       return res.status(404).send('Room not found');
               });  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})




router.get('/', (req,res)=>{
    (async () => {
        try {

            let query = roomService.getAllRooms();

            let response = [];

            await query.get().then(querySnapshot =>{
                let docs = querySnapshot.docs;
                for (let doc of docs){
                    response.push(doc.data());
                    response[response.length-1].id=doc.id;
                }
                return res.status(200).send(response);
            });
        }
        catch(error){
            console.log(error);
        }
    })();
});

router.put('/:id', (req, res) => {
    (async () => {
        try {
            await roomService.updateRoom(req.params.id,req.body.status,
                req.body.maxPlayers,req.body.name,req.body.nbPlayers,req.body.ownerUsername,req.body.password);
            return res.status(200).send(req.body.username + ' : Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

router.put('/playerUnreadyReady/:playerId/:isReady/:playerUsername/:roomId', (req, res) => {
    (async () => {
        try {
            var isReady = req.params.isReady=='true';
            await roomService.updatePlayerReadyUnready(req.params.playerId,isReady,req.params.playerUsername,req.params.roomId);
            return res.status(200).send({id:req.params.playerId,username:req.params.playerUsername,isReady:isReady});
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        };
    })();    
});

router.put('/switchAllPlayersAreReady/:roomId', (req, res) => {
    (async () => {
        try {
            await roomService.allPlayersReady(req.params.roomId)
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        };
    })();    
})

router.put('/switchAllPlayersNotReady/:roomId', (req, res) => {
    (async () => {
        try {
            await roomService.allPlayersNotReady(req.params.roomId)
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        };
    })();
})





router.put('/updateStatus/:id/:status', (req, res) => {
    (async () => {
        try {
            await roomService.updateRoomStatus(req.params.id,req.params.status);
            return res.status(200).send(req.body.username + ' : Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

router.put('/updateStatusAndChosenWord/:id/:status/:chosenWord', (req, res) => {
    (async () => {
        try {
            await roomService.updateRoomStatusAndChosenWord(req.params.id,req.params.status,req.params.chosenWord);
            return res.status(200).send('room Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

router.put('/addPlayer/:playerId/:id/:username', (req, res) => {
    (async () => {
        try {
            await roomService.addPlayerToRoom(req.params.playerId,req.params.id,req.params.username);
            return res.status(200).send('Room Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

router.put('/removePlayer/:playerId/:id/:username', (req, res) => {
    (async () => {
        try {
            await roomService.removePlayerFromRoom(req.params.playerId,req.params.id,req.params.username);
            return res.status(200).send('Room Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})





router.delete('/:id', (req, res) => {
    (async () => {
        try {
            await roomService.deleteRoom(req.params.id);
            return res.status(200).send(req.params.id + ' : Deleted ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

module.exports = router;