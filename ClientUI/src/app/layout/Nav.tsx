import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { Button, Icon, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";

function Nav() {
    const {
        userStore: { logout },
    } = useStore();

    return (
        <Navbar className="bp5-dark">
            <Navbar.Group>
                <Navbar.Heading>Recall</Navbar.Heading>
                <Navbar.Divider />
                <Link to="/decks" className="bp5-button bp5-minimal">
                    <Icon icon="folder-close" />
                    <span className="b5-button-text">Decks</span>
                </Link>
            </Navbar.Group>
            <Navbar.Group align="right">
                <Button onClick={logout} icon="log-out" minimal>
                    Sign out
                </Button>
            </Navbar.Group>
        </Navbar>
    );
}

export default observer(Nav);
