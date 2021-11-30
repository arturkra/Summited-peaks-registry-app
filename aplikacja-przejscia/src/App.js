import React,{useState} from 'react';
import './App.css';
import NowePrzejscie from './Components/NowePrzejscie/NowePrzejscie';
import Przejscie from './Components/Przejscie.js'
//import { Fragment } from 'react/cjs/react.production.min';

function App() {
  
  const [listaPrzejsc, setPrzejscia] = useState([]
/*     [{
    danePrzejscia: {
      dataPrzejscia: new Date(),
      wysokoscGory : 6546126,
      nazwaGory: 'asdaas',
      uwagiDoPrzejscia: 'ajsggfaks',
      krajGory: 'asjhfgsaf'
    }}] */
  );
  
  const addPrzejscieHandler = (przejscie) => {
      //console.log('App.js');
      console.log(przejscie);
      //listaPrzejsc.push(przejscie);
      //console.log(listaPrzejsc);
      setPrzejscia((listaPrzejsc) => {
        return [przejscie,...listaPrzejsc];
      });
      
      console.log(listaPrzejsc);
  }

  //let listaPrzejsc = [];

  


  return (
    <React.Fragment>
      <div className='dodaj-przejscie'>
        <NowePrzejscie onAddPrzejscie = {addPrzejscieHandler} />
      </div>
    <React.Fragment>

    {listaPrzejsc.map(przejscie => 
      <Przejscie
        key = {Math.random()}
        data = {przejscie.danePrzejscia.dataPrzejscia}
        gora = {przejscie.danePrzejscia.nazwaGory}
        kraj = {przejscie.danePrzejscia.krajGory}
        wysokosc = {przejscie.danePrzejscia.wysokoscGory}
        uwagi = {przejscie.danePrzejscia.uwagiPrzejscia}
      />
      
  )}

      
     
    </React.Fragment>
    </React.Fragment>
    

    

  );
}

export default App;
