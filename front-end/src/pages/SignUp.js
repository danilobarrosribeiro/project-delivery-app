import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, requestGet, setToken } from '../services/requests';

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setNewUser({ ...newUser, [name]: value });
  };

  // const isDisabled = () => {
  //   const { name, email, password } = newUser;
  //   const six = 6;
  //   const twelve = 12;
  //   const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  //   return !(password.length >= six || regex.test(email) || name.length >= twelve);
  // };

  const isDisabled = () => {
    const { name, email, password } = newUser;
    const six = 6;
    const twelve = 12;
    const regex = /^\w+([/.-]?\w+)@\w+([/.-]?\w+)(.\w{2,3})+$/;
    return !(password.length >= six && regex.test(email) && name.length >= twelve);
  };

  const signBtn = async (event) => {
    event.preventDefault();

    try {
      await requestPost('/register', { ...newUser, role: 'costumer' });

      const { token, role, name } = await requestGet('/login', user);

      setUser({ name, role });

      setToken(token);

      navigate(`/${role}`);
    } catch (e) {
      setInvalidMessage(false);
    }
  };

  return (
    <div className="container">
      <form className="container-login container-register">
        <h1>
          Cadastro
        </h1>

        <label htmlFor="name" className="container-input-login">
          <input
            className="input-login"
            data-testid="common_register__input-name"
            type="text"
            name="name"
            value={ newUser.name }
            placeholder="Seu nome"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email" className="container-input-login">
          <input
            className="input-login"
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ handleChange }
            placeholder="seu-email@site.com.br"
          />
        </label>

        <label htmlFor="password" className="container-input-login">
          <input
            className="input-login"
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ handleChange }
            placeholder="Nova Senha"
          />
        </label>

        <button
          className="btn-login"
          data-testid="common_register__button-register"
          type="button"
          disabled={ isDisabled() }
          onClick={ signBtn }
        >
          Cadastrar
        </button>
        <p
          hidden={ invalidMessage }
          data-testid="common_register__element-invalid_register"
        >
          Email ou Senha já cadastrado!!
        </p>
      </form>
    </div>
  );
}
