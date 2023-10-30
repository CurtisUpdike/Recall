import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@blueprintjs/core";
import TextArea from "../../app/common/form/TextArea";

interface Props {
    card?: Card;
    deckId: string;
}

function CardForm({ card, deckId }: Props) {
    const {
        cardStore: { createCard, updateCard },
        dialogStore,
    } = useStore();

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    front: card ? card.front : "",
                    back: card ? card.back : "",
                }}
                validationSchema={Yup.object({
                    front: Yup.string().required(),
                    back: Yup.string().required(),
                })}
                onSubmit={(values) =>
                    card
                        ? updateCard({
                              id: card.id,
                              front: values.front,
                              back: values.back,
                              deckId: card.deckId,
                          })
                        : createCard({ ...values, deckId })
                }
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <TextArea
                            name="front"
                            rows={3}
                            label="Front"
                            readOnly={isSubmitting}
                            large
                            fill
                        />
                        <TextArea
                            name="back"
                            rows={3}
                            label="Back"
                            readOnly={isSubmitting}
                            large
                            fill
                        />
                        <Button
                            disabled={isSubmitting}
                            onClick={dialogStore.closeDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            intent="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CardForm;
