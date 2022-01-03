import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getCitizenNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Citizen } from '../../types';

type CitizenCardProps = {
    citizen: Citizen
};

const CitizenCard = ({ citizen }: CitizenCardProps) => {
    const { id, name, age, city } = citizen;
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(getCitizenNote(id));
    }

    return (
        <ListItem button divider onClick={handleClick}>
            <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: 'grey' }}
                    alt={name} 
                >
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`${city}, ${age} years old`} />
        </ListItem>
    )
};

export default CitizenCard;