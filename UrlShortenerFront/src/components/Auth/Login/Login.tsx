import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../../../utils/endpoints";
import DisplayErrors from "../../Helpers/DisplayErrors";
import { authenticationResponse, loginCredentionals } from "../auth.models";
import AuthenticationContext from "../AuthenticationContext";
import { getClaims, saveToken } from "../handlejwt";
import LoginForm from "./LoginForm";

const Login = () => {
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function login(credentials: loginCredentionals) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            update(getClaims());
            navigate("/");
        } catch (error: any) {
            if (error.response.data) {
                setErrors(error.response.data);
            }
        }
    }

    return <>
        <div className="m-3">
            <h3>Login</h3>
            <DisplayErrors errors={errors} />
            <LoginForm model={{ email: "", password: "" }}
                onSubmit={async (values) => { await login(values) }} />
        </div>

    </>
};

export default Login;