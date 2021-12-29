import React from 'react';
import { getCitizenNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';

const CitizenCard = ({ citizen, showNote }: any) => {
    const { id, name, age, city } = citizen;
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(getCitizenNote(id));
    }

    return (
        <li>
            <strong>{name}</strong>
            <div>
                Age: {age} <br />
                City: {city}
            </div>
            <button onClick={handleClick}>Show note</button>
        </li>
    )
};

export default CitizenCard;