import React,{useState, useContext, createContext} from "react";
import Przejscie from "../Przejscie";

export const PrzejscieContext = createContext();




export const PrzejscieContextProvider = ({children}) =>{

    const[nowePrzejscieContext, setNowePrzejscieContext] = useState([]);

    return(
        <PrzejscieContext.Provider value={[nowePrzejscieContext, setNowePrzejscieContext]}>
            {children}
        </PrzejscieContext.Provider>
    )
}


