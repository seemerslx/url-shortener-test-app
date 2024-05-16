import { ReactElement, useContext, useEffect, useState } from "react";
import { claim } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";

const hasRoleClaim = (claims: claim[], roles: string[]) => {
    const hasRole = claims.some(claim => {
        if (claim.name === 'role' && Array.isArray(claim.value)) {
            return claim.value.some(role => roles.includes(role));
        }
        else if (claim.name === 'role' && roles.includes(claim.value)) {
            return true;
        }
        else {
            return false;
        }

    });

    if (hasRole) {
        return true;
    }
    return false;
}
const Authorized = (props: authorizedProps) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (props.roles) {
            const res = hasRoleClaim(claims, props.roles);

            setIsAuthorized(res);
        }
        else {
            setIsAuthorized(claims.length > 0);
        }
    }, [claims, props.roles]);

    return <>
        {isAuthorized ? props.authorized : props.notAuthorized}
    </>
};

interface authorizedProps {
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    roles?: string[];
}

export default Authorized;