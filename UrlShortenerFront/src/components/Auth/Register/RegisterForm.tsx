import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import TextField from "../../Forms/TextField";
import Button from "../../UI/Button";
import { registerCredentionals } from "../auth.models";

const RegisterForm = (props: registerFormProps) => {
    return <>
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required("Email field is required")
                    .email("You have input valid email"),
                username: Yup.string().required("Username field is required")
                    .max(50, "Max lengh of username is 50 charachters"),
                password: Yup.string().required("Password field is required")
            })}>
            {(formikProps) => (
                <Form>
                    <TextField displayField="Email" field="email" />
                    <TextField displayField="Username" field="username" />
                    <TextField displayField="Password" field="password" type="password" />
                    <div className="d-flex gap-2 mt-2">
                        <Button disabled={formikProps.isSubmitting} type="submit">Register</Button>
                        <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    </>
};

export default RegisterForm;

interface registerFormProps {
    model: registerCredentionals
    onSubmit(values: registerCredentionals, actions: FormikHelpers<registerCredentionals>): void;
}