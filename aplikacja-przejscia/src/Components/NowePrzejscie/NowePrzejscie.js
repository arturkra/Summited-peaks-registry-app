import React from "react";
import FormularzNowegoPrzejscia from "./FormularzNowegoPrzejscia";
import './NowePrzejscie.css'

function NowePrzejscie(props){

    const savePrzejscieHandler = (danePrzejscia) => {
        const dane = {
            danePrzejscia,
            //id: Math.random().toString()
        }
        //console.log(dane);

        props.onAddPrzejscie(dane);
    };


    return (
        <div className = "nowe-przejscie">
            <FormularzNowegoPrzejscia  />
        </div>
    )
}

export default NowePrzejscie;