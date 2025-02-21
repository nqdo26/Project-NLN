import React, { createContext, useState } from 'react';


export const AppContext = createContext();


export const ShoesWrapper = ({ children }) => {

    const [shoes, setShoes] = useState([]); 


    const [appLoading, setAppLoading] = useState(false); 

    return (
        <AppContext.Provider
            value={{
                shoes,          
                setShoes,      
                appLoading,     
                setAppLoading,  
            }}
        >
            {children} 
        </AppContext.Provider>
    );
};
