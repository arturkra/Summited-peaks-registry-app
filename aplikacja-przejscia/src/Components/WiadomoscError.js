import React from "react";
import './WiadomoscError.css';


function WiadomoscError(props) {

    return <div>
        <div className='backdrop' onClick = {props.onClick}/>
        <div className = 'komunikat'>
            <header>
                 Błąd zapisu danych
             </header>
             <div className='blad'>
                <p>
                    {props.typBledu}
                </p>
             </div>

            <footer>
                <button className='przycisk-komunikatu' onClick = {props.onClick} >OK</button>
            </footer>
        </div>
   
    </div>
}

export default WiadomoscError;