import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { urlDTO } from "../../models/url.model";
import { urlShortUrl } from "../../utils/endpoints";
import roles from "../../utils/roles";
import Authorized from "../Auth/Authorized";
import Pagination from "../Helpers/Pagination";
import RecordsPerPageSelect from "../Helpers/RecordsPerPageSelect";
import "./Urls.css";
import UrlsList from "./UrlsList";

const Urls = () => {
    const [urls, setUrls] = useState<urlDTO[]>([]);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const loadData = useCallback(() => {
        axios.get(urlShortUrl, {
            params: { page, recordsPerPage }
        })
            .then((res: AxiosResponse<urlDTO[]>) => {
                const totalAmountOfRecords =
                    parseInt(res.headers["totalamountofrecords"], 10);

                let totalAmountOfPages = Math.ceil(totalAmountOfRecords / recordsPerPage);

                setTotalAmountOfPages(totalAmountOfPages);
                console.log("Response", res.data);
                setUrls(res.data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage]);

    useEffect(() => {
        loadData();

    }, [recordsPerPage, page, loadData]);

    const deleteUrl = async (id: string) => {
        try {
            const res = await axios.delete(`${urlShortUrl}/${id}`);
            console.log(res);
            swal(`URL successfully deleted`, ``, "success")
            loadData();
        } catch (error: any) {
            const err = error as AxiosError;
            if (err) {
                swal(`${error.response.data}`, ``, "error")
                console.log(error.response.data);
            }
        }
    };

    return <>
        <div className="container m-3">
            <Authorized roles={[roles.user, roles.admin]} authorized={<Link className="btn btn-primary" to={"create"}>Short url</Link>}></Authorized>

            <RecordsPerPageSelect onChange={(amountOfRecords) => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }} />
            
            <UrlsList list={urls}>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Short Url</th>
                            <th scope="col">Leads to</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map(url => {
                            return <tr key={url.id}>
                                <td>{url.shortUrl}</td>
                                <td>{url.url}</td>
                                <td>
                                    <div className="urls-buttons">
                                        <Authorized authorized={<Link className="btn btn-primary" to={`${url.id}`}>Details</Link>}></Authorized>
                                        <Authorized authorized={<button className="btn btn-danger" onClick={async () => { await deleteUrl(url.id) }}>Delete</button>}></Authorized>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </UrlsList>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages}
                onChange={(newPage) => setPage(newPage)} />
        </div>
    </>
};

export default Urls;