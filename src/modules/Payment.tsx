import React from 'react'
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';


const validateName = (value: string) => {
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (!/^[a-z ,.'-]+$/i.test(value)) {
        error = 'Invalid name';
    }
    return error;
}

const validateNumber = (value: string) => {
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (isNaN(parseInt(value))) {
        error = 'Invalid number';
    }
    return error;
}


type Props = {}

const Payment = (props: Props) => {
    return (
        <div>

            <Formik
                initialValues={{
                    creditCardNo: '',
                    expirationDate: '',
                    cvvCode: '',
                    firstName: '',
                    lastName: '',
                    donationAmount: ''
                }}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, isValidating }) => (
                    <Form>

                        <InputField name="creditCardNo" validate={validateNumber} type="number" />

                        <InputField name="expirationDate" validate={validateNumber} type="number" />

                        <InputField name="cvvCode" validate={validateNumber} type="number" />

                        <InputField name="firstName" validate={validateName} type="text" />

                        <InputField name="lastName" validate={validateName} type="text" />

                        <InputField name="donationAmount" validate={validateNumber} type="number" />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Payment