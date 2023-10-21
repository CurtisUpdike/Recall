import { useState } from "react";
import { useStore } from "../../app/stores/store";

function LoginForm() {
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
                userStore.login(input);
                setInput(initialInput);
            }}
        >
            <h2>Login</h2>
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
            <input type="submit" />
        </form>
    );
}
export default LoginForm;
