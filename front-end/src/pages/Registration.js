import React, { useState, useContext, useEffect } from 'react';
import Headers from '../components/Header';
import RegistrationTable from '../components/RegistrationTable';
import { requestGet, requestPost, setToken } from '../services/requests';
import Context from '../context/Context';

export default function Registration() {
  const { getToLocal } = useContext(Context);
  const [error, setError] = useState(true);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const handleChange = ({ target: { value, name } }) => {
    setError(true);
    if (name === 'role' && value === 'Vendedor') {
      setData({ ...data, [name]: 'seller' });
    } else if (name === 'role' && value === 'Cliente') {
      setData({ ...data, [name]: 'customer' });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const getAllUsers = async () => {
    const allUsers = await requestGet('/admin/users');
    setUsers(allUsers);
  };

  const isDisabled = () => {
    const { name, email, password } = data;
    const six = 6;
    const twelve = 12;
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return !(password.length >= six && regex.test(email) && name.length >= twelve);
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const post = await requestPost('/admin/register', data);
      console.log(post);

      // navigate(`/${}`);
    } catch (err) {
      setError(false);
    }
  };

  useEffect(() => {
    getAllUsers();
    const { token } = getToLocal('user');
    setToken(token);
  });

  return (
    <main>
      <Headers />
      <p
        data-testid="admin_manage__element-invalid-register"
        hidden={ error }
      >
        Usuário já cadastrado
      </p>
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
            onChange={ handleChange }
            value={ data.name }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            placeholder="seuemail@fastrefresh.com"
            onChange={ handleChange }
            value={ data.email }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            data-testid="admin_manage__input-password"
            name="password"
            placeholder="*********"
            onChange={ handleChange }
            value={ data.password }
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ handleChange }
            value={ data.role }
          >
            <option
              name="seller"
              value="seller"
            >
              Vendedor
            </option>
            <option
              name="customer"
              value="customer"
            >
              Cliente
            </option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled() }
          onClick={ (event) => registerUser(event) }
        >
          Cadastrar
        </button>
      </form>
      <section>
        <h1>Lista de usuários</h1>
        <RegistrationTable users={ users } />
      </section>

    </main>
  );
}
