var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Prrzejscie = require('./Database Schemas/Przejscie');
const Przejscie = require('./Database Schemas/Przejscie');
const Uzytkownik = require('./Database Schemas/Uzytkownik');
const { exists } = require('./Database Schemas/Przejscie');
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
  //console.log(przejsciaZBazyDanych);
  res.json(przejsciaZBazyDanych);
  
});

router.post('/db', function(req,res,next) {
  //console.log(req.body.dataPrzejscia)
  const nowePrzejscie = new Prrzejscie({nazwaGory: req.body.nazwaGory,
    dataPrzejscia: req.body.dataPrzejscia,
    wysokoscGory: req.body.wysokoscGory,
    krajGory: req.body.krajGory,
    uwagiPrzejscia: req.body.uwagiPrzejscia
  });
  nowePrzejscie.save();  


  //console.log(req.body)  
});

router.post('/rejestracja',async function(req,res,next){
  //console.log();
  let czyIstnieje = await Uzytkownik.exists({login: req.body.login})

   //= await Uzytkownik.find({login : req.body.login})
  console.log('czy istnieje',czyIstnieje);
  if(czyIstnieje){
    res.json({odpowiedz: 'uzytkownik istnieje'})
    console.log('uzytkownik istnieje');
  }
  else{
    let zaszyfrowaneHaslo;
    zaszyfrowaneHaslo = await bcrypt.hash(req.body.haslo, 12);

    const nowyUzytkownik = new Uzytkownik({
      haslo: zaszyfrowaneHaslo, 
      login: req.body.login
    });
    await nowyUzytkownik.save();
    res.json({odpowiedz: 'utworzono poprawnie'});
    console.log('zapisano uzytkownika');
  }
  
});

router.post('/login', async function(req,res,next){

  let logujacyUzytkownik;
  let czyIstnieje;
  let czyHasloPoprawne;


  czyIstnieje = await Uzytkownik.exists({login: req.body.login})
  console.log('czy istnieje:' + czyIstnieje);

  if(czyIstnieje) {
    logujacyUzytkownik = await Uzytkownik.findOne({login: req.body.login});

    const czyHasloPoprawne = await bcrypt.compare(req.body.haslo, logujacyUzytkownik.haslo)
    console.log('czy haslo jest poprawne:'+czyHasloPoprawne)


    if(czyHasloPoprawne){
      res.json({odpowiedz: 'zalogowano uzytkownika'});
    }
    else{
      res.json({odpowiedz:'podano zle haslo dla tego uzytkownika'})
    }
  }
  else{
    console.log('niepoprawne dane');
    res.json({odpowiedz:'podano niepoprawne dane'});
  }



})

module.exports = router;
