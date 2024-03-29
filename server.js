const express = require('express');
const logger = require('morgan')
const bodyParser = require ('body-parser')
const playerResource = require ('./resources/PlayerResource')
const roomResource = require ('./resources/RoomResource')
const WordCoupleResource = require ('./resources/WordCoupleResource')
const app = express();
const port = process.env.PORT || 3000

app.use(logger('dev'))

//Give server access the user input through request as json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.listen(port, function(){
    console.log('Listening on '+port);
});



app.use('/api/players',playerResource)
app.use('/api/rooms',roomResource)
app.use('/api/wordCouples',WordCoupleResource)




