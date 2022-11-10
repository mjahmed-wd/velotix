import React from 'react'
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';

const luhnFormulaCheck = (value: string): boolean => {

    const originalNumbers = value.toString().split("")
    const duplicateArr = [...originalNumbers]
    const [lastDigit] = duplicateArr.splice(-1)

    const revNumbersExceptLast = [...duplicateArr].reverse()

    const multipleOddDigitsByTwo = revNumbersExceptLast.map((number, index) => ((index + 1) % 2 === 0) ? parseInt(number) : parseInt(number) * 2)

    const subtractOverNine = multipleOddDigitsByTwo.map(number => (+number > 9) ? +number - 9 : number)

    const sumOfAllNumb = subtractOverNine.reduce((acc, crr) => acc + crr, 0)

    const isValidLuhn = sumOfAllNumb % 10 === parseInt(lastDigit)

    return isValidLuhn;

}

const isValidMasterCard = (value: string) => {
    return true
}

const isValidVisaCard = (value: string) => {
    return true
}

const validateCreditCard = (value: string) => {
    let error = "";
    if (!value) {
        error = 'Required';
    }
    else if (!luhnFormulaCheck(value)) {
        error = 'Invalid Card Number';
    }

    if (isValidMasterCard(value) || isValidVisaCard(value)) {
        error = ""
    }
    return error;
}

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

                        <InputField name="creditCardNo" validate={validateCreditCard} type="string" />

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