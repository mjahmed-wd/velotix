import { Form, Formik, FormikValues } from 'formik';

import InputField from '../components/InputField';

import { donationFormInitValue } from '../utils/formInitialValues';
import { validateCreditCard, validateCvvCode, validateExpirationDateMonth, validateExpirationDateYear, validateName, validateNumber } from '../utils/validations';

const Payment = () => {

    const saveHandler = (values: FormikValues) => {
        alert(`Payment of ${values.donationAmount} USD was successful.`)
        console.log(values);
    }

    return (
        <div>

            <Formik
                initialValues={donationFormInitValue}
                onSubmit={values => { saveHandler(values) }}
            >
                <Form>

                    <InputField name="creditCardNo" label='VISA/MasterCard card info' placeholder="Card Number" validate={validateCreditCard} type="string" />

                    <div className="d-flex">
                        <InputField name="expirationDateMonth" label='Month' placeholder="Month" validate={validateExpirationDateMonth} type="number" min={1} max={12} />

                        <InputField name="expirationDateYear" label='Year' placeholder="Year" validate={validateExpirationDateYear} type="number" min={2022} max={2023} />
                    </div>

                    <InputField name="cvvCode" label='CVV code' placeholder="CVV" validate={validateCvvCode} type="number" />

                    <InputField name="firstName" label='First Name' placeholder="First name" validate={validateName} type="text" />

                    <InputField name="lastName" label='Last Name' placeholder="Last Name" validate={validateName} type="text" />

                    <InputField name="donationAmount" label='Donation Amount' placeholder="Donation Amount" validate={validateNumber} type="number" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Payment