import React, { useContext } from 'react';
import Context from '../context/Context';
// import { Link } from 'react-router-dom';

export default function Headers() {
  const { user } = useContext(Context);
  return (
    <div>
      {
        user.role === 'costumer'
          ? <div><p>PRODUTOS</p></div>
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
    </div>
  );
}

// enviamos nome e role para o context, para o headers imprimir o nome do usuário
// terminar os ternarios para os botões de cada role
