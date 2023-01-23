import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';
import Context from '../context/Context';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  const handleChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
  };

  const loginBtn = async (event) => {
    event.preventDefault();
    try {
      const { token, role, name } = await requestLogin('/login', login);

      setUser({ name, role });

      setToken(token);

      navigate(`/${role}`);
    } catch (e) {
      setInvalidMessage(false);
    }
  };

  const isDisabled = () => {
    const { email, password } = login;
    const six = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    return !(password.length >= six || regex.test(email));
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Login
          <input
            name="email"
            value={ login.email }
            type="email"
            placeholder="Digite um email"
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            value={ login.password }
            type="password"
            placeholder="Digite o password"
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>

        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isDisabled() }
          onClick={ loginBtn }
        >
          Login
        </button>

        <button
          data-testid="common_login__button-register"
          type="submit"
          onClick={ () => { navigate('/register'); } }
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
