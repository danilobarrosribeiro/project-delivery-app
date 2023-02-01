import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../services/requests';
import Context from '../context/Context';
import '../css/login.css';
import logo from '../css/images/logo.jpg';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [invalidMessage, setInvalidMessage] = useState(true);
  const navigate = useNavigate();
  const { saveToLocal, getToLocal } = useContext(Context);

  const handleChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
  };

  const loginBtn = async (event) => {
    event.preventDefault();
    try {
      const { token, role, name, email } = await requestPost('/login', login);

      setToken(token);

      saveToLocal('user', { name, email, role, token });
      saveToLocal('cartDrinks', []);
      switch (role) {
      case 'seller':
        navigate('/seller/orders');
        break;
      case 'administrator':
        navigate('/admin/manage');
        break;
      default:
        navigate('/customer/products');
        break;
      }
    } catch (e) {
      setInvalidMessage(false);
    }
  };

  const isDisabled = () => {
    const { email, password } = login;
    const six = 6;
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return !(password.length >= six && regex.test(email));
  };

  useEffect(() => {
    const user = getToLocal('user');
    if (user && user?.role === 'customer') {
      return navigate('/customer/products');
    }
  });

  return (
    <div className="container">
      <img
        className="img-logo"
        src={ logo }
        alt="Logo FastRefresh"
      />
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
