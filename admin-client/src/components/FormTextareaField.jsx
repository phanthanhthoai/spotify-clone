import {Field} from "formik";
import {FieldErrorText, FieldLabel, FieldRoot, Input, Textarea} from "@chakra-ui/react";

export default function FormTextareaField({name, label, type = "text", placeholder}) {
    return (
        <Field name={name}>
            {({field, form}) => (
                <FieldRoot invalid={form.errors[name] && form.touched[name]}>
                    <FieldLabel>{label}</FieldLabel>
                    <Textarea {...field} placeholder={placeholder} css={{"--focus-color": "white", "--error-color" : "red"}} type={type}/>
                    <FieldErrorText>{form.errors[name]}</FieldErrorText>
                </FieldRoot>
            )}
        </Field>
    )
}