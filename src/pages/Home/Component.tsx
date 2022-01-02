import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';

import { getCitizens, clearCitizenNote } from '../../redux/reducers/actions';
import CitizensList from '../../components/CitizensList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { homeSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';

const Home = () => {
    const [ searchParams, setSearchParams ] = useSearchParams({});
    const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);
    const dispatch = useAppDispatch();

    const handleNoteClose = () => {
        dispatch(clearCitizenNote());
    };

    useEffect(() => {
        if (!account) return;

        const page = searchParams.get('page') || DEFAULT_PAGE;
        dispatch(getCitizens({ page, limit: PAGE_LIMIT }));
    }, [searchParams, account])

    const handleChange = (event: any, page: any) => {
        setSearchParams({ page });
    };

    if(!account) return (
        <div className='homeContainer'>
            <Alert variant="outlined"severity="info">
                Please connect to MetaMask.
            </Alert>
        </div>
    );

    return (
        <div className='homeContainer'>
            {
                citizenNote && (
                    <Dialog onClose={handleNoteClose} open={Boolean(citizenNote)}>
                        <DialogTitle>View citizen's note</DialogTitle>
                        <DialogContent>{citizenNote }</DialogContent>
                        <DialogActions>
                            <Button onClick={handleNoteClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <CitizensList />
            
            <Pagination
                limit={PAGE_LIMIT}
                total={citizensCount}
                handleChange={handleChange}
            />
        </div>
    )
};

export default Home;