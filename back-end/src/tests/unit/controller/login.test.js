const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateLogin, createCustomerLogin } = require('../../../api/controllers/login.controller');
const loginService = require('../../../api/services/login.service');

const { expect } = chai;
chai.use(sinonChai);

describe('login controller layer tests', () => {
  it('validateLogin function', async () => {
    req = { body: {
      email: 'email@email.com',
      password: 'senha',
    }};
    res = {};
    type = 200;
    message = { message: 'message' };

    sinon.stub(loginService, 'validateLogin').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateLogin(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });

  it('createCustomerLogin function', async () => {
    req = { body: {
      name: 'name',
      email: 'email@email.com',
      password: 'senha',
    }};
    res = {};
    type = 200;
    message = { message: 'message' };

    sinon.stub(loginService, 'createUser').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await createCustomerLogin(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });

  afterEach(() => {
    sinon.restore();
  });
});