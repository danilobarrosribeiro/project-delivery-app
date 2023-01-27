const { expect } = require('chai');
const sinon = require('sinon');
const md5 = require('md5');
const loginService = require('../../../api/services/login.service');
const models = require('../../../database/models');
const jwtUtils = require('../../../api/utils/jwt.utils');

describe('Login service unit tests', () => {
  const findOneMockResponse = { dataValues: {
    id: 1,
    name: 'Fulano',
    email: 'fulano@fulano.com',
    password: md5('123456'),
    role: 'customer',
  } };

  const userInfoMock = {
    name: 'Fulano',
    email: 'fulano@fulano.com',
    password: '123456',
  };

  const token = 'd1wd7810dby8cfb2f379fb2rf023ndf239f2038';

  it('should not login with an inexinting email', async () => {
    sinon.stub(models.User, 'findOne').resolves(null);
    const response = await loginService.validateLogin('email', 'senha');
    expect(response).to.be.deep.equal({ type: 404, message:{ message: 'Incorrect email or password' } });
  });

  it('should not login with incorrect credentials', async () => {
    sinon.stub(models.User, 'findOne').resolves(findOneMockResponse);
    const response = await loginService.validateLogin('fulano@fulano.com', '1324');
    expect(response).to.be.deep.equal({ type: 404, message: { message: 'Incorrect email or password' } });
  });

  it('should login with correct credentials', async () => {
    sinon.stub(models.User, 'findOne').resolves(findOneMockResponse);
    sinon.stub(jwtUtils, 'createToken').returns(token);
    const response = await loginService.validateLogin('fulano@fulano.com', '123456');
    const { password: _, ...payload } = findOneMockResponse.dataValues;
    payload.token = token;
    expect(response).to.be.deep.equal({ type: 200, message: payload });
  });

  it('should not create a new user when name or email already exists', async () => {
    sinon.stub(models.User, 'findOne').resolves(findOneMockResponse);
    const response = await loginService.createUser(userInfoMock, 'role');
    expect(response).to.be.deep.equal({ type: 409, message: { message: 'Name or email already exists' } })
  });

  it('should create a new user', async () => {
    const role = 'anyRole'
    sinon.stub(models.User, 'findOne').resolves(null);
    sinon.stub(models.User, 'create').resolves(undefined);
    sinon.stub(jwtUtils, 'createToken').returns(token);
    const { password: _, ...payload } = userInfoMock;
    const expectedResponse = { ...payload, role, token }
    const response = await loginService.createUser(userInfoMock, role);
    expect(response).to.be.deep.equal({ type: 201, message: expectedResponse });
  });
  afterEach(() => {
    sinon.restore();
  });
});
