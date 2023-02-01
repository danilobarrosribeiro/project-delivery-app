import React from 'react';
import Headers from '../components/Header';
import RegistrationTable from '../components/RegistrationTable';

export default function Registration() {
  return (
    <main>
      <Headers />

      <h1>
        Cadastrar novo usuário
      </h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            placeholder="Nome e Sobrenome"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            placeholder="seuemail@fastrefresh.com"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            data-testid="admin_manage__input-password"
            name="password"
            placeholder="*********"
          />
        </label>
        <label htmlFor="type">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="type"
          >
            <option
              name="seller"
            >
              Vendedor
            </option>
            <option
              name="customer"
            >
              Cliente
            </option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
      <section>
        <h1>Lista de usuários</h1>
        <RegistrationTable />
      </section>

    </main>
  );
}
