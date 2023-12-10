const playerService = require('../services/PlayerService');
var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

router.post('/add', (req, res) => {
    (async () => {
        try {
            var hashedPassword = passwordHash.generate(req.body.password);
            await
                playerService.addPlayer(req.body.username, 'ONLINE', "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.pngew"
                    ,hashedPassword,req.body.email)
            return res.status(200).send('Player created successfully !');
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
            var docRef = playerService.getPlayerByUsername(req.params.username).get();
            docRef.then(function(querySnapshot){
                console.log('In query')
                    if (querySnapshot.size==0){
                        return res.status(400).send('User not found');
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
                       return res.status(400).send('User not found');
               });  
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})



router.post('/login/', (req, res) => {
    (async () => {
        try {
            var docRef = playerService.getPlayerByUsername(req.body.username).get();
            docRef.then(function(querySnapshot){
                console.log('In query' ,req.body.username,req.body.password)
                if (querySnapshot.size==0){
                    return res.status(400).send('User not found');
                }
                querySnapshot.forEach(function(doc){
                    data = doc.data();
                    if (!passwordHash.verify(req.body.password,data.password)){
                        return res.status(400).send('Wrong password');
                    }
                    else {
                        data.id = doc.id;
                        return res.status(200).send(data);
                    }


                });
            })
                .catch(function(error){
                    console.log("Error getting document :", error);
                    return res.status(400).send('User not found');
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

router.put('/updatePlayer/:id', (req, res) => {
    (async () => {
        try {
            await playerService.updatePlayer(req.params.id,req.body.username,req.body.status,req.body.profileIcon,req.body.role,req.body.password);
            return res.status(200).send(req.body.username + ' : Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

router.put('/session/:id', (req, res) => {
    (async () => {
        try {
            await playerService.updatePlayerSessionId(req.params.id,req.body.sessionId,req.body.status);
            return res.status(200).send(req.body.username + ' : Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

router.put('/wordAndRole', (req, res) => {
    
    (async () => {
        try {
            
            await playerService.updatePlayerRoleAndWord(req.body.playerId,req.body.isUndercover
                ,req.body.isMrWhite,req.body.word,req.body.wordIcon);
                
            return res.status(200).send(' Updated ! ');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })(err => console.error(err));
});

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