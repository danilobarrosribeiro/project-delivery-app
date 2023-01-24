import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import Provider from './context/Provider';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import rockGlass from './images/rockGlass.svg';
// <div className="App">
//   <span className="logo">TRYBE</span>
//   <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
//     Glass
//   </object>
// </div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        {/* <Route exact path="/" redirect="/login" /> */}
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <SignUp /> } />
        {/* <Redirect to="/login" /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
