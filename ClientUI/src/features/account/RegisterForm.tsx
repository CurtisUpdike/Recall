import { Button, H2 } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import PasswordInput from "../../app/common/form/PasswordInput";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationErrors from "./ValidationErrors";

function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{
                email: "",
                username: "",
                password: "",
                passwordConfirmation: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .register(values)
                    .catch((error) => setErrors({ error }))
            }
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                username: Yup.string().required(),
                password: Yup.string().required(),
                passwordConfirmation: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                <Form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{ maxWidth: "300px", margin: "40px auto" }}
                >
                    <H2 style={{ marginBottom: "30px" }}>Sign up for Recall</H2>
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <ValidationErrors
                                errors={errors.error as unknown as string[]}
                            />
                        )}
                    />
                    <TextInput
                        name="email"
                        label="Email"
                        readOnly={isSubmitting}
                        large
                    />
                    <TextInput
                        name="username"
                        label="Username"
                        readOnly={isSubmitting}
                        large
                    />
                    <PasswordInput
                        name="password"
                        label="Password"
                        readOnly={isSubmitting}
                        large
                    />
                    <PasswordInput
                        name="passwordConfirmation"
                        label="Confirm Password"
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
                        Sign up
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default observer(RegisterForm);
