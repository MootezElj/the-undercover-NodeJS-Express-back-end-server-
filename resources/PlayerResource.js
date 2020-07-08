const playerService = require('../services/PlayerService');
var express = require('express');
var router = express.Router();

router.post('/add', (req, res) => {
    (async () => {
        try {
            await
                playerService.addPlayer(req.body.username, 'ONLINE', "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.pngew")
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

router.get('/:username', (req, res) => {
    (async () => {
        try {
               playerService.getPlayerByUsername(req.params.username).get()
               .then(function(querySnapshot){
                       querySnapshot.forEach(function(doc){
                               data = doc.data();
                               data.id = doc.id;
                               return res.status(200).send(data);
                       });
               })
               .catch(function(error){
                       console.log("Error getting document :", error);
                       return null;
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

            let query = playerService.getAllPlayers();

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
            let document = await playerService.updatePlayer(req.params.id,req.body.username,req.body.status,req.body.profileIcon,req.body.role);
            return res.status(200).send(req.body.username + ' : Updated ! ');
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
            await playerService.deletePlayer(req.params.id);
            return res.status(200).send(req.params.id + ' : Deleted ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

module.exports = router;