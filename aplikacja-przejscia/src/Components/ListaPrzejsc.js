import React,{useState, useContext, useEffect} from "react";
import Przejscie from './Przejscie'
import './ListaPrzejsc.css'
import {PrzejscieContext} from './Context/PrzejscieContext'




const  ListaPrzejsc = (props) => {
    
    const [nowePrzejscieContext,setNowePrzejscieContext] = useContext(PrzejscieContext);

    const [listaPrzejsc, setListaPrzejsc] = useState([])

    let przejsciaZBazyDanych = null;


    //pobierzPrzejscia();

    async function pobierzPrzejscia() {
        const response = await fetch('/db');
        przejsciaZBazyDanych = await response.json();
        if(przejsciaZBazyDanych!==nowePrzejscieContext){
            setNowePrzejscieContext(przejsciaZBazyDanych);
        }
        console.log(przejsciaZBazyDanych);
    }
    
    useEffect(()=>{
        pobierzPrzejscia();
    },[])






    //setListaPrzejsc(props.przejscia);
    
    //const listaDoWyswietlenia = props.przejscia
    

    //console.log("lista przejsc");
    //console.log(nowePrzejscieContext);

    return(
        <div>
            {nowePrzejscieContext.map(przejscie => {
                return(<Przejscie
                    key = {Math.random()}
                    data = {przejscie.dataPrzejscia}
                    gora = {przejscie.nazwaGory}
                    kraj = {przejscie.krajGory}
                    wysokosc = {przejscie.wysokoscGory}
                    uwagi = {przejscie.uwagiPrzejscia}
                  />)
                
            })}
            
        </div>
    )
    
}


export default ListaPrzejsc