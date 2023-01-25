import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <header>
      {
        user.role === 'customer'
          ? (
            <nav>

              <button
                type="button"
                data-testid="customer_products__element-navbar-link-products"
                onClick={ () => navigate('/customer/products') }
              >
                PRODUTOS
              </button>

              <button
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
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => navigate('/admin/users') }
            >
              GERENCIAR USUÁRIOS
            </button>
          )
          : null
      }
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
      </div>
      <div>
        <button
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
