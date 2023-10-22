import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useField } from "formik";

interface Props {
    name: string;
    placeholder?: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    readOnly?: boolean;
    small?: boolean;
    large?: boolean;
}

function TextInput(props: Props) {
    const [field, meta] = useField(props.name);

    const hasError = meta.touched && !!meta.error;

    return (
        <FormGroup
            label={props.label}
            labelFor={props.name}
            helperText={hasError ? meta.error : null}
            intent={hasError ? "danger" : "none"}
        >
            <InputGroup id={props.name} {...field} {...props} />
        </FormGroup>
    );
}

export default TextInput;
