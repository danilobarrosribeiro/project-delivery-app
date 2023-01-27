const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { createSellerLogin } = require('../../../api/controllers/admin.controller');
const loginService = require('../../../api/services/login.service');

const { expect } = chai;
chai.use(sinonChai);

describe('admin controller layer tests', () => {
  it('should not authorize connection to a non-admin user', async () => {
    const req = { body: {
      name: 'seller',
      email: 'seller@seller.com',
      password: '123456',
      payload: {
        id: 1,
        name: 'customer',
        email: 'customer@customer.com',
        role: 'customer',
      }
    }};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await createSellerLogin(req, res);

    expect(res.status).to.have.been.calledWith(403);
    expect(res.json).to.have.been.calledWith({ message: 'You are not an admin' })
  });

  it('should authorize connection to an admin user', async () => {
    const req = { body: {
      name: 'seller12345',
      email: 'seller1234@seller.com',
      password: '123456',
      payload: {
        id: 1,
        name: 'admin',
        email: 'admin@admin.com',
        role: 'administrator',
      }
    }};
    const res = {};

    const token = '431098eu-318-90d1nb91';
    const type = 201;
    const { payload: _, ...message } = req.body;
    message.token = token;
    message.role = 'seller';
    delete message.password;
    console.log(message);

    sinon.stub(loginService, 'createUser').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await createSellerLogin(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });

  afterEach(() => {
    sinon.restore();
  });
});