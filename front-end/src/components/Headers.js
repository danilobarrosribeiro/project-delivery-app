import React, { useContext } from 'react';
import Context from '../context/Context';
// import { Link } from 'react-router-dom';

export default function Headers() {
  const { user, role } = useContext(Context);
  return (
    <div>
      <h1>Headers</h1>
      {
        role === 'costumer'
          ? <div><p>PRODUTOS</p></div>
          : null
      }
      <div>
        <p>PRODUTOS</p>
        {/* <Link to={} /> */}
      </div>
      <div>
        <p>PEDIDOS</p>
        {/* <Link to={} /> */}
      </div>
      <div>
        <p>PRODUTOS</p>
        {/* <Link to={} /> */}
      </div>
      <div>
        <p>MEUS PEDIDOS</p>
      </div>
      <div>
        <p>{ user }</p>
      </div>
      <div>
        <p>Sair</p>
      </div>
    </div>
  );
}

// enviamos nome e role para o context, para o headers imprimir o nome do usuário
// terminar os ternarios para os botões de cada role
