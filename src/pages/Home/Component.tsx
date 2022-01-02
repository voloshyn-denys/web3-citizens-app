import React, { useEffect } from 'react';

import { getCitizens, clearCitizenNote, setAccount, getCitizensCount } from '../../redux/reducers/actions';
import CitizensList from '../../components/CitizensList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { homeSelector } from './selector';
import { useLocation } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const Home = () => {
    const query = useQuery();
    const dispatch = useAppDispatch();
    const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);

    const handleConnect = async () => {
        const provider = 
            (window as any).ethereum || 
            (window as any).web3.currentProvider;

        const [ currentAccount ] = await provider.request({
            method: 'eth_requestAccounts'
        });
        const page = query.get('page') || 1;

        dispatch(setAccount(currentAccount));
        dispatch(getCitizensCount());
        dispatch(getCitizens({ page, limit: 5 }));
    };

    const handleNoteClose = () => {
        dispatch(clearCitizenNote());
    };

    useEffect(() => {
        if (!account) return;

        const page = query.get('page') || 1;
        dispatch(getCitizens({ page, limit: 5 }));
    }, [query])

    return (
        <div>
            <h1>Home</h1>
            {
                !account && <button onClick={handleConnect}>Connect to MetaMask</button>
            }
            {
                citizenNote && (
                    <blockquote>
                        { citizenNote } {' '}
                        <button onClick={handleNoteClose}>Close</button>
                    </blockquote>
                )
            }
            <CitizensList />
            <Pagination 
                limit={5}
                totalPosts={citizensCount}
            />
        </div>
    )
};

export default Home;