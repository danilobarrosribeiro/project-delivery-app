const chai = require('chai');
const chaiHttp = require('chai-http');
const models = require('../../../database/models');
const jwtUtils = require('../../../api/utils/jwt.utils');
const sinon = require('sinon');
const md5 = require('md5');

const app = require('../../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integrtion tests login routes', () => {
  it('post /login with right credentials', async () => {
    const user = {
      email: 'email@email.com',
      password: '123456',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'email@email.com',
        password: md5('123456'),
        id: 3,
        role: 'customer',
        name: 'name'
      }
    }
    const token = 'token';
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    sinon.stub(jwtUtils, 'createToken').returns(token);
    const loginResponse = await chai.request(app).post('/login').send(user);
    expect(loginResponse.body.token).to.be.equal('token');
    expect(loginResponse.status).to.be.equal(200);
  });

  it('post /login with incorrect email', async () => {
    const user = {
      email: 'email@email.com',
      password: '123456',
    };
    const token = 'token';
    sinon.stub(models.User, 'findOne').resolves(null);
    const loginResponse = await chai.request(app).post('/login').send(user);
    expect(loginResponse.body.message).to.be.equal('Incorrect email or password');
    expect(loginResponse.status).to.be.equal(404);
  });

  it('post /login with incorrect password', async () => {
    const user = {
      email: 'email@email.com',
      password: '123456',
    };
    sinon.stub(models.User, 'findOne').resolves({ dataValues: { email: user.email, password: md5('123456789'), id: 3, role: 'customer', name: 'name' } });
    const loginResponse = await chai.request(app).post('/login').send(user);
    expect(loginResponse.body.message).to.be.equal('Incorrect email or password');
    expect(loginResponse.status).to.be.equal(404);
  });

  afterEach(() => {
    sinon.restore();
  });
})