import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotAllowedPage from "../UI/NotAllowedPage";
import AuthenticationContext from "./AuthenticationContext";


const ProtectedRoutes = (props: protectedRouteProps) => {
    const context = useContext(AuthenticationContext);

    const isAdmin = () => {
        return context.claims.findIndex(x => x.name === "role" && x.value === "admin") > -1;
    };

    const isAnyUser = () => {
        return context.claims.findIndex(x => x.name === "role") > -1;
    }

    const isAdminRes = isAdmin();
    const isAnyUserRes = isAnyUser()

    if (props.isAnyAuthUser) {
        if (isAnyUserRes) {
            return <Outlet />;
        }
        else {
            return <Navigate to={"/login"} />
        }
    }
    else {
        if (isAdminRes) {
            return <Outlet />
        }
        else if (!isAdminRes && isAnyUserRes) {
            return <NotAllowedPage />
        }
        else {
            return <Navigate to={"/login"} />
        }
    }
};

interface protectedRouteProps {
    isAdmin: boolean;
    isAnyAuthUser: boolean;
};

export default ProtectedRoutes;