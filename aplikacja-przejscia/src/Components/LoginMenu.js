import React, { useContext, useEffect } from "react";
import { IsLoggedInContext } from "./Context/LoginContext";
import PanelLogowania from "./PanelLogowania";



function LoginMenu() {
    
    const [isLoggedInContext, setIsLoggedInContext] = useContext(IsLoggedInContext);
    
    const logoutHandler = () => {
        setIsLoggedInContext({
            isLoggedIn: false,
            login: undefined,
            token: undefined
        })

        localStorage.clear();

    }
    

    useEffect(()=>{
        if(!!localStorage.getItem('login') && IsLoggedInContext.isLoggedIn !== true) {
            setIsLoggedInContext({
                isLoggedIn: true,
                login: localStorage.getItem('login'),
                token: localStorage.getItem('token')
            })
        }
    },[])


    return(
        <React.Fragment>
            {<button className="logout-button" onClick={logoutHandler}>Wyloguj się</button>}
            {!isLoggedInContext.login && <PanelLogowania/>}
        </React.Fragment>

    )
}

export default LoginMenu