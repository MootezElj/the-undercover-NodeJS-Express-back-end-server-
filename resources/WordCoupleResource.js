const WordCoupleService = require('../services/WordCoupleService');
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    (async () => {
        try {
            wordCouple = await WordCoupleService.createWordCouple(req.body.standardWord,req.body.undercoverWord,
                req.body.standardWordIcon,req.body.undercoverWordIcon);
            return res.status(200).send(wordCouple);
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

            let query = WordCoupleService.getAllWordCouples();

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




module.exports = router;