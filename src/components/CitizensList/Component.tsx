import React from 'react';

import CitizenCard from '../CitizenCard/Component';
import { useAppSelector } from '../../hooks';

type Citizen = { id: string, age: string, name: string, city?: string };

const CitizensList = () => {
    const { citizens, pending, error } = useAppSelector((state: any) => state.citizens);

    if (pending) return <div>Loading...</div>;
    if (error) return <div>Some error happen. Please reload the page.</div>;

    return (
        <ol>
            {
                citizens.map((citizen: Citizen) => (
                    <CitizenCard key={citizen.id} citizen={citizen} />
                ))
            }
        </ol>
    )
};

export default CitizensList;