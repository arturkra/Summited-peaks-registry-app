import React,{useContext, useEffect, useState} from 'react';
import './App.css';
import NowePrzejscie from './Components/NowePrzejscie/NowePrzejscie';
//import Przejscie from './Components/Przejscie.js'
import ListaPrzejsc from './Components/ListaPrzejsc'
//import { Fragment } from 'react/cjs/react.production.min';
import {PrzejscieContextProvider} from './Components/Context/PrzejscieContext';
import { IsLoggedInProvider } from './Components/Context/LoginContext';
import LoginMenu from './Components/LoginMenu';
function App() {
  
  //const [listaPrzejsc, setPrzejscia] = useState([]);




  // useEffect(()=>{
  //   setIsLoggedInContext(localStorage.getItem('odpowiedz logowania'));
  //   if(localStorage.getItem('odpowiedz logowania')===undefined){
  //     setIsLoggedInContext(false);
  //   }
  // },[])



  // const addPrzejscieHandler = (przejscie) => {
  //     //console.log('App.js');
  //     console.log(przejscie);
  //     //listaPrzejsc.push(przejscie);
  //     //console.log(listaPrzejsc);
  //     setPrzejscia((listaPrzejsc) => {
  //       return [przejscie,...listaPrzejsc];
  //     });
      
  //     zapisywanePrzejscie = przejscie;

  //     //console.log(listaPrzejsc);
  // }

  //let listaPrzejsc = [];

  


  return (
    <PrzejscieContextProvider>
    <IsLoggedInProvider>
    <LoginMenu/>
    
      
    <React.Fragment>
      <div className='dodaj-przejscie'>
        <NowePrzejscie  />
      </div>
    <React.Fragment>

    <ListaPrzejsc/>

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
    </IsLoggedInProvider>
    </PrzejscieContextProvider>
    

  );
}

export default App;
