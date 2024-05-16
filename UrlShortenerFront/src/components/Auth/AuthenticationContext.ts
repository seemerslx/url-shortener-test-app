import React from "react";
import { claim } from "./auth.models";

const AuthenticationContext = React.createContext<authContext>({claims: [], update: () => {}})

export default AuthenticationContext;

interface authContext{
    claims: claim[];
    update(claims: claim[]): void
}