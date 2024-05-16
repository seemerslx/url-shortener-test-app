import axios, { AxiosError } from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { urlDTO } from "../../models/url.model";
import { urlShortUrl } from "../../utils/endpoints";
import DisplayErrors from "../Helpers/DisplayErrors";
import UrlsForm from "./UrlsForm";

const CreateUrl = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    const createUrl = async (url: urlDTO) => {
        try {
            await axios.post(urlShortUrl, url);
            navigate("/urls");
        } catch (error) {
            const err = error as AxiosError<string[]>;
            if (err && err.response) {
                setErrors(err.response?.data);
            }
        }
    };

    return <>
        <div style={{maxWidth: "600px", margin: "auto", marginTop: "10%"}}>
            <h3>Short your url here </h3>
            <DisplayErrors errors={errors} />
                <UrlsForm model={{url: "", shortUrl: "", id: ""}} onSubmit={async (values) => {
                    console.log(values);
                    await createUrl(values)
                }}></UrlsForm>
        </div>

    </>
};

export default CreateUrl;