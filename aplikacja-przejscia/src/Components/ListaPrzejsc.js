import React,{useState} from "react";
import Przejscie from './Przejscie'



const  ListaPrzejsc = (props) => {

    const x = 'asjdkghbasjldlaksdl';    


    const [listaPrzejsc, setListaPrzejsc] = useState([])



    



    //setListaPrzejsc(props.przejscia);
    
    //const listaDoWyswietlenia = props.przejscia
    

    console.log("lista przejsc");
    console.log(listaPrzejsc);

    return(
        <div>
            {listaPrzejsc.map(przejscie => {
                <Przejscie
                key = {Math.random()}
                data = {przejscie.danePrzejscia.dataPrzejscia}
                gora = {przejscie.danePrzejscia.nazwaGory}
                kraj = {przejscie.danePrzejscia.krajGory}
                wysokosc = {przejscie.danePrzejscia.wysokoscGory}
                uwagi = {przejscie.danePrzejscia.uwagiPrzejscia}
              />
            })}
            
        </div>
    )
    
}


export default ListaPrzejsc