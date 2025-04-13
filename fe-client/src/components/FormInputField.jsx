import {FieldErrorText, FieldLabel, FieldRoot, Input} from "@chakra-ui/react";
import {Field} from "formik";

export default function FormInputField({name, label, type = "text", placeholder}) {
    return (
        <Field name={name}>
            {({field, form}) => (
                <FieldRoot invalid={form.errors[name] && form.touched[name]}>
                    <FieldLabel>{label}</FieldLabel>
                    <Input {...field} placeholder={placeholder} css={{"--focus-color": "white", "--error-color" : "red"}} type={type}/>
                    <FieldErrorText>{form.errors[name]}</FieldErrorText>
                </FieldRoot>
            )}
        </Field>
    )
}