import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Home from './pages/Home/Component';
import AddCitizen from './pages/AddCitizen/Component';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/add-new-citizen">Add new citizen</Link>
          </nav>
        </header>
        <main className="main">
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="add-new-citizen" element={<AddCitizen />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;