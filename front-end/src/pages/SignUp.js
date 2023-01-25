import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../services/requests';
import Context from '../context/Context';

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  const navigate = useNavigate();
  const { saveToLocal } = useContext(Context);

  const handleChange = ({ target: { value, name } }) => {
    setNewUser({ ...newUser, [name]: value });
  };

  const isDisabled = () => {
    const { name, email, password } = newUser;
    const six = 6;
    const twelve = 12;
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return !(password.length >= six && regex.test(email) && name.length >= twelve);
  };

  const signBtn = async (event) => {
    event.preventDefault();

    try {
      const { token, role, name, email } = await requestPost('/register', newUser);

      saveToLocal('user', { name, email, role, token });
      saveToLocal('cartDrinks', []);

      setToken(token);

      navigate(`/${role}/products`);
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
