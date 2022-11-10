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

    const isValidLuhn = sumOfAllNumb % 10 === +lastDigit

    return isValidLuhn;

}

const luhnCheck = (value: string) => {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = value.length - 1; i >= 0; i--) {
        let calc = 0;
        // Extract the next digit and multiply by 1 or 2 on alternative digits.
        calc = Number(value.charAt(i)) * j;

        // If the result is in two digits add 1 to the checksum total
        if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
        }

        // Add the units element to the checksum total
        checksum = checksum + calc;

        // Switch the value of j
        if (j === 1) {
            j = 2;
        } else {
            j = 1;
        }
    }

    //Check if it is divisible by 10 or not.
    return (checksum % 10) == 0;
}

const isValidMasterCard = (value: string) => {
    const cardNumber = value.toString()
    const length = cardNumber.length;

    if (length !== 16) {
        return false;
    }

    const [firstD, secondD, thirdD, fourthD, fifthD, sixthD] = cardNumber.split("")
    const firstTwoDigit = [firstD, secondD].join("")
    const firstSixDigit = [firstD, secondD, thirdD, fourthD, fifthD, sixthD].join("")

    let isMatchFirstDigits = false
    if (55 >= +firstTwoDigit && +firstTwoDigit >= 51) {
        isMatchFirstDigits = true;
    }
    if (272099 >= +firstSixDigit && +firstSixDigit >= 222100) {
        isMatchFirstDigits = true;
    }

    return isMatchFirstDigits
}


const validateCreditCard = (value: string) => {
    let error = "";
    if (!value) {
        return error = 'Required';
    }
    if (!luhnCheck(value)) {
        return error = 'Invalid Card Number';
    }

    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3}){0,2}$/;
    const mastercardRegEx = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

    if (!visaRegEx.test(value) && !mastercardRegEx.test(value)) {
        return error = "Not a valid master or visa card number"
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

const validateExpirationDateMonth = (value: string) => {
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (+value < 1) {
        error = 'Invalid Month Number';
    }
    else if (+value > 12) {
        error = 'Invalid Month Number';
    }
    return error;
}

const validateExpirationDateYear = (value: string) => {
    const currentYear = new Date().getFullYear()
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (+value < currentYear) {
        error = 'Your card is expired';
    }
    else if (+value > (currentYear + 25)) {
        error = 'Please check the card validity again';
    }
    return error;
}

const validateCvvCode = (value: string) => {
    const cvvRegex = /^[0-9]{3,4}$/;
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (cvvRegex.test(value) || value.length > 4) {
        error = 'Invalid CVV';
    }
    return error;
}

const validateNumber = (value: string) => {
    let error = "";
    if (!value) {
        error = 'Required';
    } else if (+value <= 0) {
        error = 'Please enter a number';
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
                    expirationDateMonth: '',
                    expirationDateYear: '',
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

                        <div className="d-flex">
                            <InputField name="expirationDateMonth" validate={validateExpirationDateMonth} type="number" min={1} max={12} />

                            <InputField name="expirationDateYear" validate={validateExpirationDateYear} type="number" min={2022} max={2023} />
                        </div>

                        <InputField name="cvvCode" validate={validateCvvCode} type="number" />

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