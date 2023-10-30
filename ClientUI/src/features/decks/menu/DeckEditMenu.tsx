import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import DeckForm from "../form/DeckForm";
import DeckDelete from "../form/DeckDelete";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

const DeckMenu = ({ deck }: { deck: Deck }) => {
    const {
        dialogStore: { openDialog },
    } = useStore();

    return (
        <Menu>
            <MenuItem
                text="Rename"
                icon="floppy-disk"
                onClick={() => openDialog(<DeckForm deck={deck} />)}
            />
            <MenuItem
                text="Delete"
                icon="trash"
                onClick={() => openDialog(<DeckDelete deck={deck} />)}
            />
            <MenuDivider />
            <MenuItem text="Exit" icon="cross" />
        </Menu>
    );
};

export default observer(DeckMenu);
