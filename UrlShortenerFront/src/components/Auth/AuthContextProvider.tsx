import { ReactNode, useEffect, useState } from "react";
import { claim } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import { getClaims } from "./handlejwt";

const AuthContextProvider = (props: authContextProviderProps) => {
    const [claims, setClaims] = useState<claim[]>([]);

    useEffect(() => {
        setClaims(getClaims());
    }, []);

    return <AuthenticationContext.Provider
        value={{ claims: claims, update: setClaims }}>{props.children}</AuthenticationContext.Provider>
};

interface authContextProviderProps{
    children: ReactNode
} 

export default AuthContextProvider;