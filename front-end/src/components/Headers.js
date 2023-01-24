import React, { useContext } from 'react';
import Context from '../context/Context';
// import { Link } from 'react-router-dom';

export default function Headers() {
  const { user } = useContext(Context);
  return (
    <header>
      {
        user.role === 'costumer'
          ? (
            <nav>
              <div><p>PRODUTOS</p></div>
              <div><p>MEUS PEDIDOS</p></div>
            </nav>
          )
          : null
      }
      {
        user.role === 'seller'
          ? <div><p>PEDIDOS</p></div>
          : null
      }
      {
        user.role === 'administrator'
          ? <div><p>GERENCIAR USUÁRIOS</p></div>
          : null
      }
      {
        user.role === 'costumer'
          ? <div><p>MEUS PEDIDOS</p></div>
          : null
      }
      <div>
        <p>{ user.name }</p>
      </div>
      <div>
        <p>Sair</p>
      </div>
    </header>
  );
}

// enviamos nome e role para o context, para o headers imprimir o nome do usuário
// terminar os ternarios para os botões de cada role
