import React from "react";
import ReactDOM from "react-dom";
import './WiadomoscError.css';

const Backdrop  = (props) => {
    return <div className='backdrop' onClick = {props.onClick}/>
}

const Komunikat = (props) => {
    return <div className = 'komunikat'>
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
}

function WiadomoscError(props) {

    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Komunikat typBledu={props.typBledu} onClick={props.onClick}/>, document.getElementById('overlay-root') )}
        </React.Fragment>
    )
}

export default WiadomoscError;