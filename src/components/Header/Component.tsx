import React from "react";
import { useSearchParams, Link } from "react-router-dom";

import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { getCitizens, setAccount, getCitizensCount } from '../../redux/reducers/actions';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Header: React.FC = () => { 
    const [searchParams] = useSearchParams({});
    const { account } = useAppSelector((state: any) => state.application);
    const dispatch = useAppDispatch();

    const handleConnect = async () => {
        const provider = 
            (window as any).ethereum || 
            (window as any).web3?.currentProvider;
    
        const [ currentAccount ] = await provider.request({
            method: 'eth_requestAccounts'
        });
        const page = searchParams.get('page') || 1;
    
        dispatch(setAccount(currentAccount));
        dispatch(getCitizensCount());
        dispatch(getCitizens({ page, limit: 5 }));
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <MenuItem
                                component={Link}
                                to="/"
                            >
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            {
                                account && (
                                    <MenuItem
                                        component={Link}
                                        to="/add-new-citizen"
                                    >
                                        <Typography textAlign="center">Add new citizen</Typography>
                                    </MenuItem>
                                )
                            }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        { 
                            account ? (
                                <Typography variant="h6" component="div">{ account }</Typography>
                            ) :  (
                                <Button onClick={handleConnect} color="inherit">Connect to MetaMask</Button>
                            )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
 }

export default Header;