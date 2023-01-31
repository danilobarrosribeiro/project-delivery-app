const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const models = require('../../../database/models');
const sinon = require('sinon');
const md5 = require('md5');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests products routes', () => {
  it('Should return the products list', async () => {
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

    const databaseListProducts = [
      {
        id: 1,
        name: "Vodka",
        price: 50.00,
        url_image: "www.vodka.com.br",
      },
      {
        id: 2,
        name: "cerveja",
        price: 50.00,
        url_image: "www.cerveja.com.br",
        },
    ]
    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(user);
    console.log(loginResponse.body.token);
    sinon.restore();
    sinon.stub(models.Product, 'findAll').resolves(databaseListProducts);
    const response = await chai.request(app).get('/customer/products').set('authorization', loginResponse.body.token).send();
    expect(response.status).to.be.deep.equal(200);
    expect(response.body).to.be.deep.equal(databaseListProducts);
  });

  it('should return 403 if trying to access without token', async () => {
    const response = await chai.request(app).get('/customer/products').send();
    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token')
  });
});