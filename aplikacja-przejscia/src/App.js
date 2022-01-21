import React,{useState} from 'react';
import './App.css';
import NowePrzejscie from './Components/NowePrzejscie/NowePrzejscie';
//import Przejscie from './Components/Przejscie.js'
import ListaPrzejsc from './Components/ListaPrzejsc'
//import { Fragment } from 'react/cjs/react.production.min';

function App() {
  
  const [listaPrzejsc, setPrzejscia] = useState([]);

  let zapisywanePrzejscie = {};
  
  const addPrzejscieHandler = (przejscie) => {
      //console.log('App.js');
      console.log(przejscie);
      //listaPrzejsc.push(przejscie);
      //console.log(listaPrzejsc);
      setPrzejscia((listaPrzejsc) => {
        return [przejscie,...listaPrzejsc];
      });
      
      zapisywanePrzejscie = przejscie;

      //console.log(listaPrzejsc);
  }

  //let listaPrzejsc = [];

  


  return (
    <React.Fragment>
      <div className='dodaj-przejscie'>
        <NowePrzejscie onAddPrzejscie = {addPrzejscieHandler} />
      </div>
    <React.Fragment>

    <ListaPrzejsc przejscie={zapisywanePrzejscie}/>

    {/* {listaPrzejsc.map(przejscie => 
      <Przejscie
        key = {Math.random()}
        data = {przejscie.danePrzejscia.dataPrzejscia}
        gora = {przejscie.danePrzejscia.nazwaGory}
        kraj = {przejscie.danePrzejscia.krajGory}
        wysokosc = {przejscie.danePrzejscia.wysokoscGory}
        uwagi = {przejscie.danePrzejscia.uwagiPrzejscia}
      />
      
  )} */}

      
     
    </React.Fragment>
    </React.Fragment>
    

    

  );
}

export default App;
