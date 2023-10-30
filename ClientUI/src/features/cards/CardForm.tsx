import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Classes } from "@blueprintjs/core";
import TextArea from "../../app/common/form/TextArea";

interface Props {
    card?: Card;
    deckId: string;
}

function CardForm({ card, deckId }: Props) {
    const {
        cardStore: { createCard, updateCard },
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
                            rows={5}
                            label="Front"
                            readOnly={isSubmitting}
                            fill
                        />
                        <TextArea
                            name="back"
                            rows={5}
                            label="Back"
                            readOnly={isSubmitting}
                            fill
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

export default CardForm;
