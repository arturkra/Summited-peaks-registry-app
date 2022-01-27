import React, {useState, useEffect} from "react";



function PanelLogowania() {

    const [hasloLOGState,setHasloLOGState] = useState('');
    const [loginLOGState,setLoginLOGState] = useState('');

    const [hasloREGState,setHasloREGState] = useState('');
    const [loginREGState,setLoginREGState] = useState('');

    const loginLOGChangeHandler = (e) => {
        setLoginLOGState(e.target.value)
    }

    const hasloLOGChangeHandler = (e) => {
        setHasloLOGState(e.target.value)
    }

    const loginREGChangeHandler = (e) => {
        setLoginREGState(e.target.value)
    }

    const hasloREGChangeHandler = (e) => {
        setHasloREGState(e.target.value)
    }

    async function submitRegistrationHandler() {
        //localStorage.clear();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({haslo: hasloREGState, login: loginREGState})
        }
        const responsePromise = await fetch('/rejestracja',options);
        const response = await responsePromise.json();
        console.log(response);
        localStorage.setItem('odpowiedz rejestracji', response.odpowiedz);

          
        //console.log(options.body);
        //setHasloREGState('');
        //setLoginREGState('');
    }

    async function submitLoginHandler() {
        //localStorage.clear();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({haslo: hasloLOGState, login: loginLOGState})
        }

        const responsePromise = await fetch('/login',options);
        const response = await responsePromise.json();

        localStorage.setItem('odpowiedz logowania', response.odpowiedz);
        //console.log(options.body);
        //setHasloLOGState('');
        //setLoginLOGState('');
    }   

    return(
        <React.Fragment>
            <header>
                <h2>Zaloguj się</h2>
            </header>
            <form className="formularz-logowania" onSubmit={submitLoginHandler}>
            <div>
                <label>Login</label>
                <input type='text' value={loginLOGState} onChange={loginLOGChangeHandler}></input>
            </div>
            <div>
                <label>Hasło</label>
                <input type='text' value={hasloLOGState} onChange={hasloLOGChangeHandler}></input>
            </div>
                <button type="submit">Zaloguj</button>
            </form>
            <form className="formularz-rejestracji" onSubmit={submitRegistrationHandler}>
            <div>
                <label>Login</label>
                <input type='text' value={loginREGState} onChange={loginREGChangeHandler}></input>
            </div>
            <div>
                <label>Hasło</label>
                <input type='text' value={hasloREGState} onChange={hasloREGChangeHandler}></input>
            </div>
                <button type="submit">Zarejestruj się</button>
            </form>
            <footer>    
            </footer>
        </React.Fragment>


    )
}

export default PanelLogowania;