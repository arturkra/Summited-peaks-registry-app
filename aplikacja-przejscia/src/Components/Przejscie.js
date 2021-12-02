import React, { useState   } from 'react';
import './Przejscie.css';
import Gora from './Gora';

function Przejscie(props){
    
    // eslint-disable-next-line no-unused-vars
    //const [nazwaGory, setNazwaGory] = useState(props.gora);
    //let dzis = new Date();
    let dataPrzejscia = props.data;
    let nazwaGory = props.gora;
    let wysokoscGory = props.wysokosc;
    let krajGory = props.kraj;
    let uwagiDoPrzejscia = props.uwagi;
    //console.log(dataPrzejscia)
    //console.log(wysokoscGory)
    const miesiac = props.data.toLocaleString('pl-PL',{month:'long'});
    const dzien = props.data.toLocaleString('pl-PL',{day: '2-digit'});
    const rok = props.data.getFullYear();
/*     const clickHandler = () => {
        console.log('klikniety!!')
        setNazwaGory('nowa nazwa gory');
    }; */

    return(
        <div className='przejscie'>
            <div className='data-przejscia'>
                <div className='pojemnik-daty'></div>
                    <div>{dzien}</div> 
                    <div>{miesiac}</div>
                    <div>{rok}</div>
            </div>
            
            <div className="gora">
                <Gora nazwa = {nazwaGory} wysokosc = {wysokoscGory} kraj = {krajGory}></Gora>
            </div>
            
            <div className='uwagi-do-przejscia'>
                <h2>Uwagi:</h2>
                <div className='zawartosc-uwag'>
                    <p>{uwagiDoPrzejscia}</p>
                </div>
                
                
            </div>
            
            
        </div>

    );
}

export default Przejscie;