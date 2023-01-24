import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function Headers() {
  const { user } = useContext(Context);
  return (
    <header>
      {
        user.role === 'costumer'
          ? (
            <nav>
              <Link
                to="/costumer/products"
              >
                <div
                  data-testid="customer_products__element-navbar-link-products"
                >
                  <p>PRODUTOS</p>
                </div>
              </Link>
              <Link
                to="/costumer/orders"
              >
                <div
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  <p>MEUS PEDIDOS</p>
                </div>
              </Link>
            </nav>
          )
          : null
      }
      {
        user.role === 'seller'
          ? (
            <Link to="/seller/orders">
              <div
                data-testid="customer_products__element-navbar-link-orders"
              >
                <p>PEDIDOS</p>
              </div>
            </Link>
          )
          : null
      }
      {
        user.role === 'administrator'
          ? (
            <div
              data-testid="customer_products__element-navbar-link-orders"
            >
              <p>GERENCIAR USUÁRIOS</p>
            </div>
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
        >
          Sair
        </button>
      </div>
    </header>
  );
}

// no button SAIR falta a função de logout
