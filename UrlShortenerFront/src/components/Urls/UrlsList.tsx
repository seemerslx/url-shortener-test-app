import { ReactElement } from "react"
import { urlDTO } from "../../models/url.model";
import Loading from "../UI/Loading";

const UrlsList = (props: urlListProps) => {
    if (!props.list) {
        if (props.loadingUI) {
            return props.loadingUI;
        }
        return <Loading />
    } else if (props.list.length === 0) {
        if (props.emptyListUI) {
            return props.emptyListUI;
        }
        return <p>There are no elements to display</p>
    }
    else {
        return props.children;
    }
};

interface urlListProps {
    list: urlDTO[],
    loadingUI?: ReactElement,
    emptyListUI?: ReactElement,
    children: ReactElement
};

export default UrlsList;