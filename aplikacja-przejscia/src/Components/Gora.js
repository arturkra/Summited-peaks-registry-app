import React, {useState} from 'react';
import "./Gora.css"



function Gora(props){
    useState();
    let nazwaGory = props.nazwa;
    let wysokoscGory = props.wysokosc;
    let krajGory = props.kraj;

    return(
        <div className='gora'>
            <h2 className='naglowek-gory'>{nazwaGory}</h2>
            <div className='dane-gory'>
                <h3>Wysokość: {wysokoscGory}</h3>
                <h3>Kraj: {krajGory}</h3>
            </div>
        </div>
        
    )

}


export default Gora;