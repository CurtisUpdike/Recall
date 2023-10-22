import { Button, Callout, H2 } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import PasswordInput from "../../app/common/form/PasswordInput";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: "", password: "", error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .login(values)
                    .catch(() =>
                        setErrors({ error: "Invalid email or password" }),
                    )
            }
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                <Form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{ maxWidth: "300px", margin: "40px auto" }}
                >
                    <H2 style={{ marginBottom: "30px" }}>Sign in to Recall</H2>
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Callout
                                intent="danger"
                                style={{ marginBottom: "15px" }}
                            >
                                {errors.error}
                            </Callout>
                        )}
                    />
                    <TextInput
                        name="email"
                        label="Email"
                        readOnly={isSubmitting}
                        large
                    />
                    <PasswordInput
                        name="password"
                        label="Password"
                        readOnly={isSubmitting}
                        large
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        intent="primary"
                        type="submit"
                        large
                        fill
                    >
                        Sign in
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default observer(LoginForm);
