const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const models = require('../../../database/models');
const sinon = require('sinon');
const md5 = require('md5');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /sellers route integration tests', () => {
  it('Should not respond to a request without token', async () => {
    const response =  await chai.request(app).get('/sellers').set('authorization', 'any token').send();

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token');
  });

  it('Should return status 200 and seller', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockUserFindAll = [
      {
        id: 1,
        name: 'sellerName',
        role: 'seller',
        email: 'seller@seller.com'
      }
    ];

    sinon.stub(models.User, 'findAll').resolves(mockUserFindAll);

    const response =  await chai.request(app).get('/sellers').set('authorization', loginResponse.body.token).send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockUserFindAll);
  });

  it('Should return 404 if there are no sellers on db', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    sinon.stub(models.User, 'findAll').resolves(null);

    const response =  await chai.request(app).get('/sellers').set('authorization', loginResponse.body.token).send();

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Pedido não cadastrado');
  })
  afterEach(() => {
    sinon.restore();
  });
});

describe('GET /sellers/orders route integration tests', () => {
  it('Should not respond to a request without token', async () => {
    const response =  await chai.request(app).get('/sellers/orders').set('authorization', 'any token').send();

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token');
  });

  it('Should return status 200 and sellers list', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockSaleFindAll = [
      {
      userId: 2,
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
      },
      {
      userId: 2,
      sellerId: 3,
      totalPrice: 40.35,
      deliveryAddress: 'x address',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
      },
    ];

    sinon.stub(models.Sale, 'findAll').resolves(mockSaleFindAll);

    const response =  await chai.request(app).get('/sellers/orders').set('authorization', loginResponse.body.token).send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockSaleFindAll);
  });

  it('Should return 404 if there are no sellers on db', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    sinon.stub(models.Sale, 'findAll').resolves(null);

    const response =  await chai.request(app).get('/sellers/orders').set('authorization', loginResponse.body.token).send();

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Pedido não cadastrado');
  })
  afterEach(() => {
    sinon.restore();
  });
});

describe('GET /sellers/:id route integration tests', () => {
  it('Should return status 200 and the order details', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);
    sinon.restore();

    const mockSaleFindOne = {
      id: 3,
      userId: 3,
      sellerId: 2,
      totalPrice: '17',
      deliveryAddress: 'Rua x',
      deliveryNumber: '10',
      saleDate: '2023-01-31T17:14:26.000Z',
      status: 'a',
      user_id: 3,
      seller_id: 2
    };

    const mockSaleProductFindAll = [
      {
      saleId: 3,
      productId: 1,
      quantity: 3,
      product_id: 1,
      sale_id: 3,
    },
    {
      saleId: 3,
      productId: 2,
      quantity: 1,
      product_id: 2,
      sale_id: 3,
    }
    ];

    const mockProductFindAll = [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg'
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg'
      }
    ];

    sinon.stub(models.Sale, 'findOne').resolves(mockSaleFindOne);
    sinon.stub(models.SaleProduct, 'findAll').resolves(mockSaleProductFindAll);
    sinon.stub(models.Product, 'findAll').resolves(mockProductFindAll);

    const response =  await chai.request(app).get('/sellers/3').set('authorization', loginResponse.body.token).send();

    const mockResponse = {
      ...mockSaleFindOne,
      products: [
        {
          id: 1,
          name: 'Skol Lata 250ml',
          price: '2.20',
          url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
          quantity: 3
        },
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
          quantity: 1,
        },
      ],
    };

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockResponse);
  });

  it('Should return 404 if there is no order with provided id', async () => {
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
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);
    sinon.stub(models.Sale, 'findOne').resolves(null);

    const response =  await chai.request(app).get('/sellers/3').set('authorization', loginResponse.body.token).send();

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Pedido não cadastrado');
  });

  it('Should not respond to a request without token', async () => {
    const response =  await chai.request(app).get('/sellers/3').set('authorization', 'any token').send();

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token');
  });
  afterEach(() => {
    sinon.restore();
  });
});

describe('PUT /sellers route integration tests', () => {
  it('Should return updated order with status 200 if customer tries to update to \'Entregue\'', async () => {
    const userLogin = {
      email: 'customer@customer.com',
      password: 'customerPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'user@user.com',
        password: md5('customerPassword'),
        id: 2,
        role: 'customer',
        name: 'name'
      }
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockSaleFindByPk = {
      id: 1,
      userId: 2,
      sellerId: 3,
      totalPrice: 20.45,
      deliveryAddress: 'Rua x',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Em trânsito',
    };

    const req = { status: 'Entregue' };
    const expectedResponse = { ...mockSaleFindByPk, status: req.status }

    sinon.stub(models.Sale, 'findByPk').resolves(mockSaleFindByPk);
    sinon.stub(models.Sale, 'update').resolves(expectedResponse);


    const response =  await chai.request(app).put('/sellers/1').set('authorization', loginResponse.body.token).send(req);


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(expectedResponse);

  });

  it('Should return updated order with status 200 if seller tries to update to \'Em Trânsito\'', async () => {
    const userLogin = {
      email: 'seller@seller.com',
      password: 'sellerPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'seller@seller.com',
        password: md5('sellerPassword'),
        id: 3,
        role: 'seller',
        name: 'name'
      }
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockSaleFindByPk = {
      id: 1,
      userId: 2,
      sellerId: 3,
      totalPrice: 20.45,
      deliveryAddress: 'Rua x',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
    };

    const req = { status: 'Em Trânsito' };
    const expectedResponse = { ...mockSaleFindByPk, status: req.status }

    sinon.stub(models.Sale, 'findByPk').resolves(mockSaleFindByPk);
    sinon.stub(models.Sale, 'update').resolves(expectedResponse);


    const response =  await chai.request(app).put('/sellers/1').set('authorization', loginResponse.body.token).send(req);


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(expectedResponse);

  });

  it('Should return updated order with status 200 if seller tries to update to \'Preparando\'', async () => {
    const userLogin = {
      email: 'seller@seller.com',
      password: 'sellerPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'seller@seller.com',
        password: md5('sellerPassword'),
        id: 3,
        role: 'seller',
        name: 'name'
      }
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockSaleFindByPk = {
      id: 1,
      userId: 2,
      sellerId: 3,
      totalPrice: 20.45,
      deliveryAddress: 'Rua x',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
    };

    const req = { status: 'Preparando' };
    const expectedResponse = { ...mockSaleFindByPk, status: req.status }

    sinon.stub(models.Sale, 'findByPk').resolves(mockSaleFindByPk);
    sinon.stub(models.Sale, 'update').resolves(expectedResponse);


    const response =  await chai.request(app).put('/sellers/1').set('authorization', loginResponse.body.token).send(req);


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(expectedResponse);

  });

  it('Should return updated order with status 403 if seller tries to update to \'Entregue\'', async () => {
    const userLogin = {
      email: 'seller@seller.com',
      password: 'sellerPassword',
    };
    const userDatabaseResponse = {
      dataValues: {
        email: 'seller@seller.com',
        password: md5('sellerPassword'),
        id: 3,
        role: 'seller',
        name: 'name'
      }
    };

    sinon.stub(models.User, 'findOne').resolves(userDatabaseResponse);
    const loginResponse = await chai.request(app).post('/login').send(userLogin);

    const mockSaleFindByPk = {
      id: 1,
      userId: 2,
      sellerId: 3,
      totalPrice: 20.45,
      deliveryAddress: 'Rua x',
      deliveryNumber: '1910',
      saleDate: new Date().toDateString(),
      status: 'Pendente',
    };

    const req = { status: 'Entregue' };
    const expectedResponse = { ...mockSaleFindByPk, status: req.status }

    sinon.stub(models.Sale, 'findByPk').resolves(mockSaleFindByPk);
    sinon.stub(models.Sale, 'update').resolves(expectedResponse);


    const response =  await chai.request(app).put('/sellers/1').set('authorization', loginResponse.body.token).send(req);


    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('Usuário não autorizado');

  });

  it('Should not respond to a request without token', async () => {
    const response =  await chai.request(app).put('/sellers/1').set('authorization', 'any token').send();

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.equal('You must provide a valid token');
  });
  afterEach(() => {
    sinon.restore();
  });
});