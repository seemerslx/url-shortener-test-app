import { Form, Formik, FormikHelpers } from "formik";
import { urlDTO } from "../../models/url.model";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../UI/Button";

const UrlsForm = (props: urlsFormProps) => {
    return <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            url: Yup.string().required("This is field is requiered").url("This should be an url"),
        })}>
        {(formikProps) => (
            <Form>
                <div className='form-group'>
                    <TextField displayField="Url" field="url" />
                </div>
                <div className="d-flex gap-2 mt-2">
                    <Button
                        disabled={formikProps.isSubmitting}
                        type='submit'>Save changes</Button>
                    <Link className="btn btn-secondary" to="/urls">Cancel</Link>
                </div>
            </Form>
        )}
    </Formik>
};

export default UrlsForm;

interface urlsFormProps {
    model: urlDTO,
    onSubmit(values: urlDTO, action: FormikHelpers<urlDTO>): void
}