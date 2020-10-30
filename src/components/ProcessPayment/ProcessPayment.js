import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51Ha1uwFV9ByOT04Bf3izDQXFiNzYoHy2iEgzmXZdJMsbK4jYFQeVIsMzQ70iTRq2KynrsZjuykCHQvKQdPVSuD6r00YoBvVbG5');

const ProcessPayment = ({handlePayment}) => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>
            
        </>
    );
};

export default ProcessPayment;