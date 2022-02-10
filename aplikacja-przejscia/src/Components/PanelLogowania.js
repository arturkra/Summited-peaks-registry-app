import React, {useState, useEffect, useContext} from "react";
import ReactDOM from "react-dom";
import { IsLoggedInContext } from "./Context/LoginContext";
import './PanelLogowania.css'




const Backdrop  = (props) => {
    return <div className='backdrop' onClick = {props.onClick}/>
}

function PanelLogowania(props) {

    const [isLoggedInContext,setIsLoggedInContext] = useContext(IsLoggedInContext);

    const [hasloLOGState,setHasloLOGState] = useState('');
    const [loginLOGState,setLoginLOGState] = useState('');

    const [hasloREGState,setHasloREGState] = useState('');
    const [loginREGState,setLoginREGState] = useState('');

    const [loginState, setLoginState] = useState(false);

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

    async function submitRegistrationHandler(event) {
        event.preventDefault();

        localStorage.clear();
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
        setHasloREGState('');
        setLoginREGState('');
    }

    async function submitLoginHandler(event) {
        event.preventDefault();
        localStorage.clear();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({haslo: hasloLOGState, login: loginLOGState})
        }

        const responsePromise = await fetch('/login',options);
        const response = await responsePromise.json();

        console.log(response);

        setIsLoggedInContext({
            isLoggedIn: response.odpowiedz,
            login: response.login,
            token: response.token
        })

        localStorage.setItem('login', response.login);
        localStorage.setItem('token', response.token);

        setHasloLOGState('');
        setLoginLOGState('');
    }   

    const Backdrop  = (props) => {
        return <div className='login-backdrop' onClick = {props.onClick}/>
    }
    


    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('backdrop-root'))}
            <div  className="formularz">
            <header>
               Zaloguj się
            </header>
            
            <form className="formularz-logowania" onSubmit={submitLoginHandler}>
            <div >
                <label>Login</label>
                <input type='text' value={loginLOGState} onChange={loginLOGChangeHandler}></input>
            </div>
            <div>
                <label>Hasło</label>
                <input type='password' value={hasloLOGState} onChange={hasloLOGChangeHandler}></input>
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
                <input type='password' value={hasloREGState} onChange={hasloREGChangeHandler}></input>
            </div>
                <button type="submit">Zarejestruj się</button>
            </form>
            </div>
            
            <footer>    
            </footer>
            
            
        </React.Fragment>


    )
}

export default PanelLogowania;