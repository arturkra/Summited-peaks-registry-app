var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Prrzejscie = require('./Database Schemas/Przejscie');
const Przejscie = require('./Database Schemas/Przejscie');
const Uzytkownik = require('./Database Schemas/Uzytkownik');
var router = express.Router();


mongoose.connect('mongodb://localhost/peaks-database', () => {
  console.log('polaczono z baza danych');
});

let przejsciaZBazyDanych = null;
let uzytkownicyZBazyDanych = null;

run();

async function run() {
  // const przejscie = new Prrzejscie({
  //   nazwaGory: 'Rysy',
  //   dataPrzejscia: new Date(),
  //   wysokoscGory: 2501,
  //   kraj: 'Polska',
  //   uwagi: 'duzo puchu',
  // })
  uzytkownicyZBazyDanych= await Uzytkownik.find();
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

router.post('/rejestracja', function(req,res,next){
  console.log(req.body.login);
  const czyIstnieje = Uzytkownik.findOne({login : req.body.login})
  if(czyIstnieje){
    res.json({odpowiedz: 'uzytkownik istnieje'})
  }
  else{
    const nowyUzytkownik = new Uzytkownik({
      haslo: req.body.haslo, 
      login: req.body.login
    });
    nowyUzytkownik.save();
    res.json({odpowiedz: 'utworzono poprawnie'});
  }
  console.log('zapisano uzytkownika');
});

router.post('/login', function(req,res,next){
  console.log(req.body.login);
})

module.exports = router;
