import React from 'react';
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from '../../constants';
import CitizenCard from '../CitizenCard/Component';

type Citizen = { id: string, age: string, name: string, city?: string };

const CitizensList = (props: any) => { 
    const handleNote = async (id: string) => {
        const provider = 
            (window as any).ethereum || 
            (window as any).web3.currentProvider;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(CONTACT_ABI as any, CONTACT_ADDRESS);

        const note = await contract.methods.getNoteByCitizenId(id).call();

        alert(note);
    };

    return (
        <ol>
            {
                props.citizens.map((citizen: Citizen) => (
                    <CitizenCard key={citizen.id} citizen={citizen} showNote={handleNote} />
                ))
            }
        </ol>
    )
};

export default CitizensList;