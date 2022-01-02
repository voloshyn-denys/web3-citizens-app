import * as yup from 'yup';

export const validationSchema = yup.object({
    age: yup
      .number()
      .min(18, 'Too yang. Only adults can be added to the list')
      .max(150, 'Too old.')
      .required('Age is required'),
    city: yup
      .string()
      .required('City can\'t be empty'),
    name: yup
      .string()
      .required('Name can\'t be empty'),
    note: yup
      .string()
      .required('Notes about citizen are required'),
  });