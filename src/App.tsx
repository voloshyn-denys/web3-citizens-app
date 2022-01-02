import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Container from "@mui/material/Container";

import Home from './pages/Home/Component';
import AddCitizen from './pages/AddCitizen/Component';
import Header from "./components/Header/Component";
import { useAppDispatch } from './hooks';
import { setAccount, getCitizensCount } from './redux/reducers/actions';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isMetaMask = (window as any).ethereum?.isMetaMask;
    const isConnected = (window as any).ethereum?.isConnected();
    const selectedAddress = (window as any).ethereum?.selectedAddress;

    if(!isMetaMask || !isConnected) return;

    dispatch(getCitizensCount());
    dispatch(setAccount(selectedAddress));
  }, []);

  return (
      <Router>
        <div className="app">
          <Header />
          <Container maxWidth="md">
            <main className="main">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="add-new-citizen" element={<AddCitizen />} />
                </Routes>
            </main>
          </Container>
        </div>
      </Router>
  );
};

export default App;