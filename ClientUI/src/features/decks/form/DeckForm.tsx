import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import { Button, Classes } from "@blueprintjs/core";

interface Props {
    deck?: Deck;
}

function DeckForm({ deck }: Props) {
    const { deckStore } = useStore();

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ name: deck ? deck.name : "" }}
                validationSchema={Yup.object({ name: Yup.string().required() })}
                onSubmit={(values) =>
                    deck
                        ? deckStore.updateDeck({
                              id: deck.id,
                              name: values.name,
                          })
                        : deckStore.createDeck(values)
                }
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <TextInput
                            name="name"
                            label="Name"
                            placeholder="What do you want to call your deck?"
                            readOnly={isSubmitting}
                        />
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                loading={isSubmitting}
                                intent="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DeckForm;
