import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { Button, Icon, IconName, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";

function Nav() {
    const {
        userStore: { user, logout },
    } = useStore();

    return (
        <Navbar className="bp5-dark">
            <Navbar.Group>
                <Navbar.Heading>Recall</Navbar.Heading>
                <Navbar.Divider />
                <NavLink to="/" icon="home">
                    Home
                </NavLink>
                <NavLink to="/decks" icon="folder-close">
                    Decks
                </NavLink>
            </Navbar.Group>
            <Navbar.Group align="right">
                {!user ? (
                    <>
                        <NavLink to="register" icon="person">
                            Sign up
                        </NavLink>
                        <NavLink to="login" icon="log-in">
                            Sign in
                        </NavLink>
                    </>
                ) : (
                    <Button
                        onClick={logout}
                        className="bp5-minimal"
                        icon="log-out"
                    >
                        Sign out
                    </Button>
                )}
            </Navbar.Group>
        </Navbar>
    );
}

interface NavLinkProps {
    to: string;
    icon?: IconName;
    children: string;
}

const NavLink = ({ icon, ...props }: NavLinkProps) => (
    <Link {...props} className="bp5-button bp5-minimal">
        {icon && <Icon icon={icon} />}
        <span className="b5-button-text">{props.children}</span>
    </Link>
);

export default observer(Nav);
