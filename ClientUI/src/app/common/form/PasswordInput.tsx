import { Button, FormGroup, InputGroup, Tooltip } from "@blueprintjs/core";
import { useField } from "formik";
import { useState } from "react";

interface Props {
    name: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    readOnly?: boolean;
    small?: boolean;
    large?: boolean;
}

function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    const lockButton = (
        <Tooltip
            content={`${showPassword ? "Hide" : "Show"} Password`}
            disabled={props.disabled}
        >
            <Button
                disabled={props.disabled}
                icon={showPassword ? "unlock" : "lock"}
                intent={"warning"}
                minimal={true}
                onClick={() => setShowPassword((x) => !x)}
            />
        </Tooltip>
    );

    return (
        <FormGroup
            label={props.label}
            labelFor={props.name}
            helperText={meta.touched && meta.error ? meta.error : null}
            intent={meta.touched && !!meta.error ? "danger" : "none"}
        >
            <InputGroup
                id={props.name}
                rightElement={lockButton}
                type={showPassword ? "text" : "password"}
                {...field}
                {...props}
            />
        </FormGroup>
    );
}

export default TextInput;
