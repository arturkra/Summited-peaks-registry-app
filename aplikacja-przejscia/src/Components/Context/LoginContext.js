import React,{useState, createContext} from "react";

export const IsLoggedInContext = createContext();


export const IsLoggedInProvider = ({children}) =>{

    //let przejsciaZBazyDanych;

 

    const[isLoggedInContext, setIsLoggedInContext] = useState({
        isLoggedIn: false,
        login: undefined,
        token: undefined
    });

    return(
        <IsLoggedInContext.Provider value={[isLoggedInContext, setIsLoggedInContext]}>
            {children}
        </IsLoggedInContext.Provider>
    )
}