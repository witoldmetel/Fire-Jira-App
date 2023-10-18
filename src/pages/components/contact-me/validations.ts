import * as Yup from 'yup';

export const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().min(20).required('Message is required'),
});
