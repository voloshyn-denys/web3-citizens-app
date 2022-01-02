import React, { useState } from 'react';
import { useFormik } from 'formik';

import { validationSchema } from './validation';
import { useAppDispatch } from '../../hooks';
import { addNewCitizen } from '../../redux/reducers/actions';
import './Component.scss'

const AddCitizen = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const dispatch = useAppDispatch();
    const handleSubmit = (formValues: any, { resetForm }: any) => {
        dispatch(
            addNewCitizen(formValues)
        );
        setIsFormSubmitted(true);
        resetForm();
    };

    const formik = useFormik({
        initialValues: {
            age: '',
            city: '',
            name: '',
            note: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });
    
    const errors = formik.errors as any;
    const touched = formik.touched as any;

    return (
        <div>
            <h1>Add new citizen</h1>
            {
                isFormSubmitted && (
                    <div>
                        Please confirm adding new citizen in MetaMask.
                    </div>
                )
            }
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="age">Age</label> {' '}
                    <input
                        id="age"
                        name="age"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    { errors.age && touched.age && <div className='error'>{errors.age}</div> }
                </div>
                <div>
                    <label htmlFor="city">City</label>  {' '}
                    <input
                        id="city"
                        name="city"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    { errors.city && touched.city && <div className='error'>{errors.city}</div> }
                </div>
                <div>
                    <label htmlFor="name">Name</label>  {' '}
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    { errors.name && touched.name && <div className='error'>{errors.name}</div> }
                </div>
                <div>
                    <label htmlFor="note">Some Note</label> {' '}
                    <input
                        id="note"
                        name="note"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.note}
                    />
                    { errors.note && touched.note && <div className='error'>{errors.note}</div> }
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddCitizen;