import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Provider from './context/Provider';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Registration from './pages/Registration';

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
      <Provider>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <SignUp /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/seller/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/customer/orders" element={ <Orders /> } />
          <Route exact path="/seller/orders" element={ <Orders /> } />
          <Route exact path="/admin/manage" element={ <Registration /> } />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
