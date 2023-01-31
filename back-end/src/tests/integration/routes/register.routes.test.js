const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const models = require('../../../database/models');
const sinon = require('sinon');
const jwtUtils = require('../../../api/utils/jwt.utils');


chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests register routes', () => {
  it('Should return 201 and the new user info', async () => {
    const newUser = {
      name: 'name',
      email: 'email@email.com',
      password: '123456',
    };
    const token = 'token';
    sinon.stub(models.User, 'findOne').resolves(null);
    sinon.stub(jwtUtils, 'createToken').returns(token);
    sinon.stub(models.User, 'create').resolves({});
    const payload = { ...newUser, token, role: 'customer' };
    delete payload.password;
    const response = await chai.request(app).post('/register').send(newUser);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(payload);
  });

  it('Should return 409 if trying to create a user with name or email already used', async () => {
    const newUser = {
      name: 'name',
      email: 'email@email.com',
      password: '123456',
    };
    sinon.stub(models.User, 'findOne').resolves({ dataValues: newUser });
    const response = await chai.request(app).post('/register').send(newUser);
    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal('Name or email already exists');
  });

  afterEach(() => {
    sinon.restore();
  });
});