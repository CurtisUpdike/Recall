import { useState } from "react";
import agent from "./api/agent";
import {
    AccountResponse,
    LoginRequest,
    RegisterRequest,
} from "./models/account";

function App() {
    let [user, setUser] = useState<AccountResponse | null>();

    async function handleRegister(request: RegisterRequest) {
        const response = await agent.Account.register(request);
        setUser(response);
    }

    async function handleLogin(request: LoginRequest) {
        const response = await agent.Account.login(request);
        setUser(response);
    }

    return (
        <>
            <h1>Welcome to Recall!</h1>
            {user ? (
                <>
                    <h2>Hello {user.userName}!</h2>
                    <button onClick={() => setUser(null)}>Logout</button>
                </>
            ) : (
                <>
                    <RegisterForm handleSubmit={handleRegister} />
                    <LoginForm handleSubmit={handleLogin} />
                </>
            )}
        </>
    );
}

const RegisterForm = ({
    handleSubmit,
}: {
    handleSubmit: (request: RegisterRequest) => void;
}) => {
    const initialInput = {
        email: "",
        userName: "",
        password: "",
        passwordConfirmation: "",
    };

    const [input, setInput] = useState(initialInput);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(input);
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
};

const LoginForm = ({
    handleSubmit,
}: {
    handleSubmit: (request: LoginRequest) => void;
}) => {
    const initialInput = {
        email: "",
        userName: "",
        password: "",
        passwordConfirmation: "",
    };

    const [input, setInput] = useState(initialInput);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(input);
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
};

export default App;
