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

    function submitRegistrationHandler() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({haslo: hasloREGState, login: loginREGState})
        }
        fetch('/rejestracja',options).then(response => {
            return response.json()
        }).then(data => {
            console.log(data.odpowiedz);
        });  
        console.log(options.body);
        setHasloREGState('');
        setLoginREGState('');
    }

    function submitLoginHandler() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({haslo: hasloLOGState, login: loginLOGState})
        }
        fetch('/login',options);  
        console.log(options.body);
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