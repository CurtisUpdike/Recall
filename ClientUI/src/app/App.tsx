import RegisterForm from "../features/account/RegisterForm";
import LoginForm from "../features/account/LoginForm";
import { Button, Navbar, Section } from "@blueprintjs/core";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App() {
    const { userStore } = useStore();

    return (
        <>
            <Navbar>
                <Navbar.Group>
                    <Navbar.Heading>Recall</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp5-minimal" icon="home" text="Home" />
                </Navbar.Group>
            </Navbar>
            <h1>Welcome to Recall!</h1>
            <Section>
                {userStore.user ? (
                    <>
                        <h2>Hello {userStore.user!.userName}!</h2>
                        <button onClick={userStore.logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <RegisterForm />
                        <LoginForm />
                    </>
                )}
            </Section>
        </>
    );
}

export default observer(App);
