import React, { useState } from 'react';

import { getCitizens } from '../../redux/reducers/actions';
import CitizensList from '../../components/CitizensList/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Home = () => {
    const [account, setAccount] = useState(null);
    const dispatch = useAppDispatch();
    const { citizenNote } = useAppSelector((state: any) => state.citizens);

    const handleConnect = async () => {
        const provider = 
            (window as any).ethereum || 
            (window as any).web3.currentProvider;

        const [ currentAccount ] = await provider.request({
            method: 'eth_requestAccounts'
        });

        setAccount(currentAccount);

        dispatch(getCitizens());
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleConnect}>Connect to MetaMask</button>
            <div>{ account }</div>
            <blockquote>{ citizenNote }</blockquote>
            <CitizensList />
        </div>
    )
};

export default Home;