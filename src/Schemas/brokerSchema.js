import * as yup from 'yup';


export const brokerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.string()
    .matches(/^[0-9]{10,15}$/, 'Phone must be 10‑15 digits')
    .required('Phone number is required'),
  address: yup.string()
    .min(5, 'Too short')
    .required('Address is required'),
  brokerRate: yup.number()
    .typeError('Broker rate must be a number')
    .min(0, 'Must be ≥ 0%')
    .max(100, 'Must be ≤ 100%')
    .required('Broker rate is required'),
  status: yup.boolean(),
}).required();
