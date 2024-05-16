import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlDetailsDTO } from "../../models/url.model";
import { formatDateToString } from "../../utils/dateFormatter";
import { urlShortUrl } from "../../utils/endpoints";
import Loading from "../UI/Loading";
import "./UrlDetails.css";

const UrlDetails = () => {
    const { id } = useParams();
    const [url, setUrl] = useState<urlDetailsDTO>();
    useEffect(() => {
        axios.get(`${urlShortUrl}/${id}`)
            .then((response: AxiosResponse<urlDetailsDTO>) => {
                console.log(response.data);
                setUrl(response.data);
            });
    }, [id]);

    return <>
        <div className="url-details">
            {url ?
                <div className="url-details-card card">
                    <div className="card-header text-center">
                        Url info
                    </div>
                    <div className="card-body">
                        <div className="url-details-card-field m-3">
                            <span>Url: <a href={`${url?.url}`}>{`${url?.url}`}</a></span>
                        </div>
                        <div className="url-details-card-field m-3">
                            <span>Created At: {formatDateToString(url.createdAt)}</span>
                        </div>
                        <div className="url-details-card-field m-3">
                            <span>Created By: {url.createdBy}</span>
                        </div>
                        <div className="url-details-card-field m-3">
                            <span>Short Url: <a href={`${url?.shortUrl}`}>{`${url?.shortUrl}`}</a></span>
                        </div>
                        <div className="m-3">
                        </div>
                    </div>
                </div> : <Loading />}
        </div>
    </>
};

export default UrlDetails;