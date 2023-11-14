import { H1, Button, Icon } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import LoginForm from "../account/LoginForm";
import RegisterForm from "../account/RegisterForm";
import "./homePage.css";
import { router } from "../../app/router/routes";

function HomePage() {
    const { userStore, dialogStore } = useStore();

    return (
        <div className="homePageContainer">
            <div className="homePageHeader">
                <Icon icon="lightning" size={35} />
                <H1>Recall</H1>
            </div>
            <div className="homePageButtons">
                {userStore.isLoggedIn ? (
                    <>
                        <Button
                            text="Go to your decks"
                            onClick={() => router.navigate("/decks")}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            icon="person"
                            text="Sign in"
                            onClick={() =>
                                dialogStore.openDialog(<LoginForm />, "Sign in")
                            }
                        />
                        <Button
                            icon="log-in"
                            text="Sign up"
                            onClick={() =>
                                dialogStore.openDialog(
                                    <RegisterForm />,
                                    "Sign up",
                                )
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;
