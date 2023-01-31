const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const models = require('../../../database/models');
const sinon = require('sinon');
const md5 = require('md5');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests POST /customer/orders routes', () => {
  it('Should create a new order', async () => {
    const userLogin = {
      email: 'user@user.com',
      password: 'userPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'user@user.com',
        password: md5('userPassword'),
        id: 2,
        role: 'customer',
        name: 'name'
      }
    }

    const mockModelCreate = {
      userId: 2,
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
    }
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);
    sinon.restore();
    sinon.stub(models.Sale, 'create').resolves(mockModelCreate);
    sinon.stub(models.SaleProduct, 'create').resolves(null);
    const response = await chai.request(app).post('/customer/orders').set('authorization', loginResponse.body.token).send({
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      products: [1, 2] });
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(mockModelCreate)
  });

  it('Should not create and throw 409 if models.Sale.create does not return', async () => {
    const userLogin = {
      email: 'user@user.com',
      password: 'userPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'user@user.com',
        password: md5('userPassword'),
        id: 2,
        role: 'customer',
        name: 'name'
      }
    }

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);
    sinon.restore();
    sinon.stub(models.Sale, 'create').resolves(null);

    const response = await chai.request(app).post('/customer/orders').set('authorization', loginResponse.body.token).send({
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      products: [1, 2] });

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal('Não foi possivel cadastrar o pedido')
  });

  it('Should not create a new sale withot token', async () => {
    const mockModelCreate = {
      userId: 2,
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
    }

    sinon.stub(models.Sale, 'create').resolves(mockModelCreate);
    sinon.stub(models.SaleProduct, 'create').resolves(null);
    const response = await chai.request(app).post('/customer/orders').send({
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      products: [1, 2] });
    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token')
  });
  afterEach(() => {
    sinon.restore();
  });
});