import React from 'react'
import { Field, ErrorMessage } from 'formik'

type Props = {
    validate?: (value: string) => string,
    name: string,
    type: string,
    label?: string,
    [x: string]: any
}

const InputField = (props: Props) => {
    const { validate = () => "", name, type = "text", label = "", ...rest } = props


    return (
        <div>
            <label>{label}</label>
            <Field name={name} type={type} validate={validate} className="form-control" {...rest} />

            <ErrorMessage name={name} render={msg => <p className="text-danger font-size-sm">{msg}</p>} />

        </div>
    )
}

export default InputField