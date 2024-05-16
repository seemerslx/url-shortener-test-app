import { Formik, FormikHelpers, Form } from "formik";
import { Link } from "react-router-dom";
import TextField from "../../Forms/TextField";
import Button from "../../UI/Button";
import * as Yup from "yup";
import { loginCredentionals } from "../auth.models";

const LoginForm = (props: loginFormProps) => {
    return <>
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required("Email field is required")
                    .email("You have input valid email"),
                password: Yup.string().required("Password field is required")
            })}>
            {(formikProps) => (
                <Form>
                    <TextField displayField="Email" field="email" />
                    <TextField displayField="Password" field="password" type="password" />

                    <div className="d-flex gap-2 mt-2">
                        <Button disabled={formikProps.isSubmitting} type="submit">Login</Button>
                        <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    </>
};

export default LoginForm;

interface loginFormProps {
    model: loginCredentionals
    onSubmit(values: loginCredentionals, actions: FormikHelpers<loginCredentionals>): void;
}