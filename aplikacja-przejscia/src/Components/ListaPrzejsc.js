import React,{useState, useContext, useEffect} from "react";
import Przejscie from './Przejscie'
import './ListaPrzejsc.css'
import {PrzejscieContext} from './Context/PrzejscieContext'
import { IsLoggedInContext } from "./Context/LoginContext";




const  ListaPrzejsc = (props) => {
    
    const [nowePrzejscieContext,setNowePrzejscieContext] = useContext(PrzejscieContext);
    const [isLoggedInContext,setIsLoggedInContext] = useContext(IsLoggedInContext);

    const [listaPrzejsc, setListaPrzejsc] = useState([])

    let przejsciaZBazyDanych = null;


    //pobierzPrzejscia();

    async function pobierzPrzejscia() {

        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer '+ isLoggedInContext.token

            }
        }

        const response = await fetch('/db',options);
        przejsciaZBazyDanych = await response.json();
        console.log(przejsciaZBazyDanych);
        if(przejsciaZBazyDanych!==nowePrzejscieContext){
            setNowePrzejscieContext(przejsciaZBazyDanych);
        }
        //console.log(przejsciaZBazyDanych);
    }
    
    useEffect(()=>{
        if(isLoggedInContext.isLoggedIn === true) {
            pobierzPrzejscia();
        }
        
    },[isLoggedInContext])






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