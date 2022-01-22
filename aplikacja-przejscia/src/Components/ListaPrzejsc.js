import React,{useState, useContext} from "react";
import Przejscie from './Przejscie'
import {PrzejscieContext} from './Context/PrzejscieContext'



const  ListaPrzejsc = (props) => {
    
    const [nowePrzejscieContext,setNowePrzejscieContext] = useContext(PrzejscieContext);

    const [listaPrzejsc, setListaPrzejsc] = useState([])

    ////////////////////////////////////////////////////////////
    //Nie chce wyświetlać Przejsc. Dodają się do tablicy, ale //
    //element się nie odświeża.                               //
    ////////////////////////////////////////////////////////////    



    //setListaPrzejsc(props.przejscia);
    
    //const listaDoWyswietlenia = props.przejscia
    

    console.log("lista przejsc");
    console.log(nowePrzejscieContext);

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