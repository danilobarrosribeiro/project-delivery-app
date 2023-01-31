const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const models = require('../../../database/models');
const jwtUtils = require('../../../api/utils/jwt.utils');
const sinon = require('sinon');
const md5 = require('md5');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests admin routes', () => {
  it('Should return seller response object', async () => {
    const adminLogin = {
      email: 'admin@admin.com',
      password: 'adminPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'admin@admin.com',
        password: md5('adminPassword'),
        id: 3,
        role: 'administrator',
        name: 'name'
      }
    }
    const token = 'sellerToken';
    const expectedResponse = {
      name: 'seller',
      email: 'seller@seller.com',
      role: 'seller',
      token,
    };
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(adminLogin);
    sinon.restore();
    sinon.stub(jwtUtils, 'createToken').returns(token);
    sinon.stub(models.User, 'findOne').resolves(null);
    const response = await chai.request(app).post('/admin/register').set('authorization', loginResponse.body.token).send({name: expectedResponse.name, email: expectedResponse.email, password: 'sellerPassword'});
    expect(response.body.name).to.be.equal(expectedResponse.name);
    expect(response.body.email).to.be.equal(expectedResponse.email);
    expect(response.status).to.be.equal(201);
  });

  it('Should return 409 after trying to create a user with a name or email already used', async () => {
    const adminLogin = {
      email: 'admin@admin.com',
      password: 'adminPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'admin@admin.com',
        password: md5('adminPassword'),
        id: 3,
        role: 'administrator',
        name: 'name'
      }
    }
    const token = 'sellerToken';
    const expectedResponse = {
      name: 'seller',
      email: 'seller@seller.com',
      role: 'seller',
      token,
    };
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(adminLogin);
    sinon.restore();
    sinon.stub(jwtUtils, 'createToken').returns(token);
    sinon.stub(models.User, 'findOne').resolves(expectedResponse);
    const response = await chai.request(app).post('/admin/register').set('authorization', loginResponse.body.token).send({name: expectedResponse.name, email: expectedResponse.email, password: 'sellerPassword'});
    expect(response.body.message).to.be.equal('Name or email already exists');
    expect(response.status).to.be.equal(409);
  });

  it('Should return 403 if who is trying to create a seller user is not an admin', async () => {
    const adminLogin = {
      email: 'admin@admin.com',
      password: 'adminPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'admin@admin.com',
        password: md5('adminPassword'),
        id: 3,
        role: 'customer',
        name: 'name'
      }
    }
    const token = 'sellerToken';
    const expectedResponse = {
      name: 'seller',
      email: 'seller@seller.com',
      role: 'seller',
      token,
    };
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(adminLogin);
    sinon.restore();
    sinon.stub(jwtUtils, 'createToken').returns(token);
    sinon.stub(models.User, 'findOne').resolves(null);
    const response = await chai.request(app).post('/admin/register').set('authorization', loginResponse.body.token).send({name: expectedResponse.name, email: expectedResponse.email, password: 'sellerPassword'});
    expect(response.body.message).to.be.equal('You are not an admin');
    expect(response.status).to.be.equal(403);
  });

  afterEach(() => {
    sinon.restore();
  });
});