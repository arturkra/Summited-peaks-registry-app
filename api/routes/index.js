var express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Prrzejscie = require('./Database Schemas/Przejscie');
const Przejscie = require('./Database Schemas/Przejscie');
const Uzytkownik = require('./Database Schemas/Uzytkownik');
const { exists } = require('./Database Schemas/Przejscie');
const checkAuth = require('./middleware/check-auth');
var router = express.Router();



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

    let token; 
      token = jwt.sign(
        {
          userId: nowyUzytkownik.id,
          login: nowyUzytkownik.login
        },
        'klucz_tokena',
        {expiresIn: '1h'}
        );

    res.json(
        {
          odpowiedz: 'utworzono poprawnie',
          login: nowyUzytkownik.login,
          token: token
        }
      );

    console.log('zapisano uzytkownika');
  }
  
});

router.post('/login', async function(req,res,next){

  let logujacyUzytkownik;
  let czyIstnieje;


  czyIstnieje = await Uzytkownik.exists({login: req.body.login})
  console.log('czy istnieje:' + czyIstnieje);

  if(czyIstnieje) {
    logujacyUzytkownik = await Uzytkownik.findOne({login: req.body.login});

    const czyHasloPoprawne = await bcrypt.compare(req.body.haslo, logujacyUzytkownik.haslo)
    console.log('czy haslo jest poprawne:'+czyHasloPoprawne)


    if(czyHasloPoprawne){
      
      let token; 
      token = jwt.sign(
        {
          userId: logujacyUzytkownik.id,
          login: logujacyUzytkownik.login
        },
        'klucz_tokena',
        {expiresIn: '1h'}
        );
      
      res.json({odpowiedz: true, login: logujacyUzytkownik.login, token: token});  

    }
    else{
      res.json({odpowiedz: false})
    }
  }
  else{
    console.log('niepoprawne dane');
    res.json({odpowiedz: false});
  }



})


router.use(checkAuth);

mongoose.connect('mongodb://localhost/peaks-database', () => {
  console.log('polaczono z baza danych');
});

let przejsciaZBazyDanych = null;
let uzytkownicyZBazyDanych = null;

run();

async function run() {
  uzytkownicyZBazyDanych= await Uzytkownik.find();
  przejsciaZBazyDanych = await Przejscie.find().sort({$natural: -1})
  //console.log(przejsciaZBazyDanych);
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

  res.json({odpowiedz: 'zapisano przejscie poprawnie'});

  //console.log(req.body)  
});



module.exports = router;
