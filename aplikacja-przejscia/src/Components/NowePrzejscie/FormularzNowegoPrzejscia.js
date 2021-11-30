import React, {useState} from "react";
import './FormularzNowegoPrzejscia.css'
import WiadomoscError from "../WiadomoscError";

function FormularzNowegoPrzejscia(props){
    const [wprowadzonaNazwa, setNazwa] = useState('');
    const [wprowadzonaWysokosc, setWysokosc] = useState('');
    const [wprowadzonyKraj, setKraj] = useState('');
    const [wprowadzonaData, setData] = useState('');
    const [wprowadzoneUwagi, setUwagi] = useState('');
    const [blad, setBlad] = useState()


    const nazwaChangeHandler = (event) => {
        setNazwa(event.target.value);
    };
    const wysokoscChangeHandler = (event) => {
        setWysokosc(event.target.value);
    }   
    const krajChangeHandler = (event) => {
        setKraj(event.target.value);
    }
    const dataChangeHandler = (event) => {
        setData(event.target.value);
    }
    const uwagiChangeHandler = (event) => {
        setUwagi(event.target.value);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        if(wprowadzonaNazwa.trim().length === 0){
            setBlad('Podaj nazwę góry');
            return;
            
        }
        if(wprowadzonaWysokosc.trim().length === 0){
            setBlad('Podaj wysokość góry');
            return;
        }
        if(wprowadzonyKraj.trim().length === 0){
            setBlad('Podaj kraj');
            return;
        }
        if(wprowadzonaData.trim().length === 0){
            setBlad('Podaj datę przejścia');
            return;
        }                   
        else{
            const przejscieDane = {
                nazwaGory:  wprowadzonaNazwa,
                wysokoscGory: wprowadzonaWysokosc,
                krajGory: wprowadzonyKraj,
                dataPrzejscia: new Date(wprowadzonaData),
                uwagiPrzejscia: wprowadzoneUwagi
            }
            props.onSavePrzejscie(przejscieDane);
            setData('');
            setKraj('');
            setWysokosc('');
            setNazwa('');
            setUwagi('');
        }
        

    };

    const BladHandler = () =>{
        setBlad(null);
    }

    return <form onSubmit = {submitHandler}>
        
        {blad && <WiadomoscError typBledu = {blad} onClick = {BladHandler}/>}
        <div className = 'caly-formularz'>
            <div className='naglowek-formularza'>
                <label>Dodaj Przejscie</label>
            </div>
            <div className='nazwa-gory'>
                <label>Nazwa Góry</label><br/>
                <input type='text' value = {wprowadzonaNazwa} onChange ={nazwaChangeHandler}/>
            </div>
            <div className = 'wysokosc-gory'>
                <label>Wysokość Góry</label><br/>
                <input type='number' value={wprowadzonaWysokosc} min = '0' step = '1' onChange ={wysokoscChangeHandler}/>
            </div>
            <div className = 'kraj-gory'>
                <label>Kraj</label><br/>
                <input type = 'text' value={wprowadzonyKraj} onChange = {krajChangeHandler}/>
            </div>
            
            <div className = 'data-wejscia'>
                <label>Data</label><br/>
                <input type = 'date' value = {wprowadzonaData} onChange = {dataChangeHandler}/>
            </div>
            <div className = 'uwagi-do-przejscia'>
                <label>Uwagi</label><br/>
                <input type = 'text'  value = {wprowadzoneUwagi} onChange = {uwagiChangeHandler}/>
            </div>
            <div className = "dodaj-przejscie">
                <button className='przycisk-dodaj-przejscie' type='submit'>Dodaj przejscie</button>
            </div>
        </div>
    </form>
}

export default FormularzNowegoPrzejscia;