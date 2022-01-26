var express = require('express');
const mongoose = require('mongoose');
const Prrzejscie = require('./Database Schemas/Przejscie');
const Przejscie = require('./Database Schemas/Przejscie');
var router = express.Router();


mongoose.connect('mongodb://localhost/peaks-database', () => {
  console.log('polaczono z baza danych');
});

let przejsciaZBazyDanych = null;

run();

async function run() {
  // const przejscie = new Prrzejscie({
  //   nazwaGory: 'Rysy',
  //   dataPrzejscia: new Date(),
  //   wysokoscGory: 2501,
  //   kraj: 'Polska',
  //   uwagi: 'duzo puchu',
  // })
  przejsciaZBazyDanych = await Przejscie.find().sort({$natural: -1})
  //console.log(przejsciaZBazyDanych);
  //console.log(przejscie)
} 

//console.log(Przejscie.find({nazwaGory: 'Rysy'}));

/* GET home page. */
router.get('/', function(req, res, next) {
   //res.json({asd:'asdas'});
});

router.get('/json', function(req, res, next) {
  res.json({
    id: '1',
    czy: ' dziala'
  });
});

router.get('/db',async function(req,res,next) {
  await run();
  console.log(przejsciaZBazyDanych);
  res.json(przejsciaZBazyDanych);
  
});

router.post('/db', function(req,res,next) {
  console.log(req.body.dataPrzejscia)
  const nowePrzejscie = new Prrzejscie({nazwaGory: req.body.nazwaGory,
    dataPrzejscia: req.body.dataPrzejscia,
    wysokoscGory: req.body.wysokoscGory,
    krajGory: req.body.krajGory,
    uwagiPrzejscia: req.body.uwagiPrzejscia
  });
  nowePrzejscie.save();  


  console.log(req.body)  
});

module.exports = router;
