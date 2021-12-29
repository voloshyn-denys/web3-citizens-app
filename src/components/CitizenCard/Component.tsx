import React from 'react';

const CitizenCard = ({ citizen, showNote }: any) => {
    const { id, name, age, city } = citizen;

    return (
        <li>
            <strong>{name}</strong>
            <div>
                Age: {age} <br />
                City: {city}
            </div>
            <button onClick={() => {showNote(id)}}>Show note</button>
        </li>
    )
};

export default CitizenCard;