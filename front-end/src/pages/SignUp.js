import React, { useState } from 'react';
import { requestSignUp } from '../services/requests';
// import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  // const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setNewUser({ ...newUser, [name]: value });
  };

  const isDisabled = () => {
    const { name, email, password } = newUser;
    const six = 6;
    const twelve = 12;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    return !(password.length >= six && regex.test(email) && name.length >= twelve);
  };

  const signBtn = async (event) => {
    event.preventDefault();
    try {
      const { data } = await requestSignUp('/register', { ...newUser, role: 'Costumer' });
    } catch (e) {
      setInvalidMessage(false);
    }
  };

  return (
    <div>
      <h1>
        Cadastro
      </h1>
      <form>

        <label htmlFor="name">
          <input
            data-testid="common_register__input-name"
            type="text"
            name="name"
            value={ newUser.name }
            placeholder="Seu nome"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ handleChange }
            placeholder="seu-email@site.com.br"
          />
        </label>

        <label htmlFor="password">
          <input
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ handleChange }
            placeholder="Nova Senha"
          />
        </label>

      </form>
      <button
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
    </div>
  );
}
