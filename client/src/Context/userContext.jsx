import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();


const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const localUser = localStorage.getItem("WEB_APP");
        if(localUser){
            setUser(JSON.parse(localStorage.getItem("WEB_APP")));
        }
    },[])
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;