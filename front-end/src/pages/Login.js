import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  console.log('teste se entrou no login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState(true);
  // const [btnDisabled, setButtonDisabled] = useState();
  const navigate = useNavigate();

  const verifyInput = (value) => {

  };

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          Login
          <input
            name="email-input"
            value={ email }
            type="email"
            placeholder="Digite um email"
            data-testid="common_login__input-email"
            onChange={ ({ target: { value } }) => verifyInput(value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            name="password-input"
            value={ password }
            type="password"
            placeholder="Digite o password"
            data-testid="common_login__input-password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>

        <button
          data-testid="common_login__button-login"
          type="submit"
          /* disabled={ btnDisabled } */
          /* onClick={ () => {} } */
        >
          Login
        </button>

        <button
          data-testid="common_login__button-register"
          type="submit"
          onClick={ () => { navigate.push('/register'); } }
        >
          Ainda não tenho conta
        </button>
        <p
          hidden={ invalidMessage }
          data-testid="common_login__element-invalid-email"
        >
          Email ou Senha inválido!!
        </p>
      </form>
    </div>
  );
}

export default Login;

//             /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
