import React, {useState, useEffect, useReducer, useContext} from "react";
import './FormularzNowegoPrzejscia.css'
import WiadomoscError from "../WiadomoscError";
import {PrzejscieContext} from '../Context/PrzejscieContext'


const przejscieReducer = (state, action) => {

    if(action.type === 'INPUT_NAZWA') {
        return {
            nazwa: action.value,
            wysokosc: state.wysokosc,
            kraj: state.kraj,
            data: state.data,
            uwagi: state.uwagi,
            blad: null
        }
    }
    if(action.type === 'INPUT_WYSOKOSC') {
        return {
            nazwa: state.nazwa,
            wysokosc: action.value,
            kraj: state.kraj,
            data: state.data,
            uwagi: state.uwagi,
            blad: null
        }
    }
    if(action.type === 'INPUT_KRAJ') {
        return {
            nazwa: state.nazwa,
            wysokosc: state.wysokosc,
            kraj: action.value,
            data: state.data,
            uwagi: state.uwagi,
            blad: null
        }
    }
    if(action.type === 'INPUT_DATA') {
        return {
            nazwa: state.nazwa,
            wysokosc: state.wysokosc,
            kraj: state.kraj,
            data: action.value,
            uwagi: state.uwagi,
            blad: null
        }
    }
    if(action.type === 'INPUT_UWAGI') {
        return {
            nazwa: state.nazwa,
            wysokosc: state.wysokosc,
            kraj: state.kraj,
            data: state.data,
            uwagi: action.value,
            blad: null
        }  
    }
    if(action.type === 'TYP_BLEDU') {
        return {
            nazwa: state.nazwa,
            wysokosc: state.wysokosc,
            kraj: state.kraj,
            data: state.data,
            uwagi: state.uwagi,
            blad: action.value
        }
    }

    return {
        nazwa: '',
        wysokosc: '',
        kraj: '',
        data: '',
        uwagi: '',
        blad: null
    }
};

// const initialPrzejscieState = {
//     nazwa: '',
//     wysokosc: '',
//     kraj: '',
//     data: '',
//     uwagi: '',
//     blad: null
// }

function FormularzNowegoPrzejscia(props){
    // const [wprowadzonaNazwa, setNazwa] = useState('');
    // const [wprowadzonaWysokosc, setWysokosc] = useState('');
    // const [wprowadzonyKraj, setKraj] = useState('');
    // const [wprowadzonaData, setData] = useState('');
    // const [wprowadzoneUwagi, setUwagi] = useState('');
    // const [blad, setBlad] = useState()

    const [nowePrzejscieContext,setNowePrzejscieContext] = useContext(PrzejscieContext);


    const [przejscieState, dispatchPrzejscie] = useReducer(przejscieReducer,
        {
        nazwa: '',
        wysokosc: '',
        kraj: '',
        data: '',
        uwagi: '',
        blad: null
    });
    
    
    const nazwaChangeHandler = (event) => {
        dispatchPrzejscie({type:'INPUT_NAZWA', value: event.target.value});
        //setNazwa(event.target.value);
    };
    const wysokoscChangeHandler = (event) => {
        dispatchPrzejscie({type:'INPUT_WYSOKOSC', value: event.target.value});
        //setWysokosc(event.target.value);
    }   
    const krajChangeHandler = (event) => {
        dispatchPrzejscie({type:'INPUT_KRAJ', value: event.target.value});
        //setKraj(event.target.value);
    }
    const dataChangeHandler = (event) => {
        dispatchPrzejscie({type:'INPUT_DATA', value: event.target.value});
        //console.log(event.target.value);
        //setData(event.target.value);
    }
    const uwagiChangeHandler = (event) => {
        dispatchPrzejscie({type:'INPUT_UWAGI', value: event.target.value});
        //setUwagi(event.target.value);
    }



    async function submitHandler(event){
        event.preventDefault();
        if(przejscieState.nazwa.trim().length === 0){
            dispatchPrzejscie({type: 'TYP_BLEDU', value:'Podaj nazwę góry'})
            
            //setBlad('Podaj nazwę góry');
            return;
            
        }
        if(przejscieState.wysokosc.trim().length === 0){
            dispatchPrzejscie({type: 'TYP_BLEDU', value:'Podaj wysokość góry'})
            //setBlad('Podaj wysokość góry');
            return;
        }
        if(przejscieState.kraj.trim().length === 0){
            dispatchPrzejscie({type: 'TYP_BLEDU', value:'Podaj kraj'})
            //setBlad('Podaj kraj');
            return;
        }
        if(przejscieState.data.trim().length === 0){
            dispatchPrzejscie({type: 'TYP_BLEDU', value:'Podaj datę przejścia'})
            //setBlad('Podaj datę przejścia');
            return;
        }                   
        else{
            const przejscieDane = {
                nazwaGory:  przejscieState.nazwa,
                wysokoscGory: przejscieState.wysokosc,
                krajGory: przejscieState.kraj,
                dataPrzejscia: new Date(przejscieState.data).toLocaleDateString(),
                uwagiPrzejscia: przejscieState.uwagi
            }
            
            await setNowePrzejscieContext(()=>{
                //console.log(przejscieDane);
                return([przejscieDane,...nowePrzejscieContext])
            });

            const options ={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  }, 
                body: JSON.stringify(przejscieDane)
            }

            fetch('/db',options)
            //console.log(nowePrzejscieContext);
            //props.onSavePrzejscie(przejscieDane);
            dispatchPrzejscie({type: null});
        }
        

    };

     const BladHandler = () =>{
         dispatchPrzejscie({type:'TYP_BLEDU', value: ''})
    }

    return <form onSubmit = {submitHandler}>
        
        {przejscieState.blad && <WiadomoscError typBledu = {przejscieState.blad} onClick = {BladHandler}/>}
        <div className = 'caly-formularz'>
            <div className='naglowek-formularza'>
                <label>Dodaj Przejscie</label>
            </div>
            <div className='nazwa-gory'>
                <label>Nazwa Góry</label><br/>
                <input type='text' value = {przejscieState.nazwa} onChange ={nazwaChangeHandler}/>
            </div>
            <div className = 'wysokosc-gory'>
                <label>Wysokość Góry</label><br/>
                <input type='number' value={przejscieState.wysokosc} min = '0' step = '1' onChange ={wysokoscChangeHandler}/>
            </div>
            <div className = 'kraj-gory'>
                <label>Kraj</label><br/>
                <input type = 'text' value={przejscieState.kraj} onChange = {krajChangeHandler}/>
            </div>
            
            <div className = 'data-wejscia'>
                <label>Data</label><br/>
                <input type = 'date' value = {przejscieState.data} onChange = {dataChangeHandler}/>
            </div>
            <div className = 'uwagi-do-przejscia'>
                <label>Uwagi</label><br/>
                <input type = 'text'  value = {przejscieState.uwagi} onChange = {uwagiChangeHandler}/>
            </div>
            <div className = "dodaj-przejscie">
                <button className='przycisk-dodaj-przejscie' type='submit'>Dodaj przejscie</button>
            </div>
        </div>
    </form>
}

export default FormularzNowegoPrzejscia;