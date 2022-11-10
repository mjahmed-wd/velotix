import React from 'react'
import { Field, ErrorMessage } from 'formik'

type Props = {
    validate?: (value: string) => string,
    name: string,
    type: string,
    label?: string
}

const InputField = (props: Props) => {
    const { validate = () => "", name, type = "text", label = "" } = props


    return (
        <div>
            <label>{name}</label>
            <Field name={name} type={type} validate={validate} className="form-control" />

            <ErrorMessage name={name} render={msg => <p className="text-danger font-size-sm">{msg}</p>} />

        </div>
    )
}

export default InputField