import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import logo from '../css/images/logo.jpg';

export default function Headers() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const removeToLocal = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
  }, []);

  return (
    <header className="container-header">
      {
        user.role === 'customer'
          ? (
            <nav className="nav-header">

              <button
                className="btn-header"
                type="button"
                data-testid="customer_products__element-navbar-link-products"
                onClick={ () => navigate('/customer/products') }
              >
                PRODUTOS
              </button>

              <button
                className="btn-header"
                type="button"
                onClick={ () => navigate('/customer/orders') }
                data-testid="customer_products__element-navbar-link-orders"
              >
                MEUS PEDIDOS
              </button>
            </nav>
          )
          : null
      }
      {
        user.role === 'seller'
          ? (

            <button
              className="btn-header"
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => navigate('/seller/orders') }
            >
              PEDIDOS
            </button>
          )
          : null
      }
      {
        user.role === 'administrator'
          ? (
            <button
              className="btn-header"
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => navigate('/admin/users') }
            >
              GERENCIAR USUÁRIOS
            </button>
          )
          : null
      }

      <img
        className="img-logo-header"
        src={ logo }
        alt="Logo FastRefresh"
      />
      <div className="nav-header">
        <p
          className="name-header"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
        <button
          className="btn-header"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => removeToLocal() }
        >
          Sair
        </button>
      </div>
    </header>
  );
}
