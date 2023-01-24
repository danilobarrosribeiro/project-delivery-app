import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGet, setToken } from '../services/requests';
import Context from '../context/Context';
// import '../css/login.css';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  const navigate = useNavigate();
  const user = useContext(Context);

  const handleChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
  };

  const loginBtn = async (event) => {
    event.preventDefault();
    try {
      const { token, role, name } = await requestGet('/login', login);

      user.setUser({ name, role });

      setToken(token);

      navigate(`/${role}`);
    } catch (e) {
      setInvalidMessage(false);
    }
  };

  const isDisabled = () => {
    const { email, password } = login;
    const six = 6;
    const regex = /^\w+([/.-]?\w+)@\w+([/.-]?\w+)(.\w{2,3})+$/;
    return !(password.length >= six && regex.test(email));
  };

  return (
    <div className="container">
      <form className="container-login ">
        <label htmlFor="email" className="container-input-login">
          Login
          <input
            className="input-login"
            name="email"
            value={ login.email }
            type="email"
            placeholder="Digite um email"
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password" className="container-input-login">
          Senha
          <input
            className="input-login"
            name="password"
            value={ login.password }
            type="password"
            placeholder="Digite o password"
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>
        <div className="container-btn">
          <button
            className="btn-login"
            data-testid="common_login__button-login"
            type="submit"
            disabled={ isDisabled() }
            onClick={ loginBtn }
          >
            Login
          </button>

          <button
            className="btn-login btn-register"
            data-testid="common_login__button-register"
            type="submit"
            onClick={ () => { navigate('/register'); } }
          >
            Ainda não tenho conta
          </button>
        </div>
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
