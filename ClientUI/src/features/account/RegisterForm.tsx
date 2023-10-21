import { useState } from "react";
import { useStore } from "../../app/stores/store";

function RegisterForm() {
    const initialInput = {
        email: "",
        userName: "",
        password: "",
        passwordConfirmation: "",
    };

    const [input, setInput] = useState(initialInput);
    const { userStore } = useStore();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                userStore.register(input);
                setInput(initialInput);
            }}
        >
            <h2>Register</h2>
            <label htmlFor="email">
                Email Address:
                <input
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={(e) =>
                        setInput((oldInput) => ({
                            ...oldInput,
                            email: e.target.value,
                        }))
                    }
                />
            </label>
            <br />
            <label htmlFor="userName">
                Username:
                <input
                    id="userName"
                    name="userName"
                    value={input.userName}
                    onChange={(e) =>
                        setInput((oldInput) => ({
                            ...oldInput,
                            userName: e.target.value,
                        }))
                    }
                />
            </label>
            <br />
            <label htmlFor="password">
                Password:
                <input
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={(e) =>
                        setInput((oldInput) => ({
                            ...oldInput,
                            password: e.target.value,
                        }))
                    }
                />
            </label>
            <br />
            <label htmlFor="passwordConfirmation">
                Confirm Password:
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={input.passwordConfirmation}
                    onChange={(e) =>
                        setInput((oldInput) => ({
                            ...oldInput,
                            passwordConfirmation: e.target.value,
                        }))
                    }
                />
            </label>
            <br />
            <input type="submit" />
        </form>
    );
}

export default RegisterForm;
