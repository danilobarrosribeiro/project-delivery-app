const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../api/services/sale.service');
const { createProductSale } = require('../../../api/services/sale.service');
const models = require('../../../database/models');

describe('Sale service unit tests', () => {
  // it('getById function should return a sale by id', async () => {
  //   const id = 1;
  //   const order = { order: 'order' };
  //   const type = 200;

  //   sinon.stub(models.Sale, 'findOne').resolves(order);
  //   const response = await saleService.getById(id);
  //   expect(response).to.be.deep.equal({ type, message: order });
  // });
  it('getById function should return a not found error 404', async () => {
    const id = 1;
    const order = null;
    const type = 404;

    sinon.stub(models.Sale, 'findOne').resolves(order);
    const response = await saleService.getById(id);
    expect(response).to.be.deep.equal({ type, message: { message: 'Pedido não cadastrado' } });
  });
  // it('createSale function should create a sale', async () => {
  //   const newOrder = { order: 'order', products: ['products'] };
  //   const createdOrder = { createdOrder: 'createdOrder'};

  //   sinon.stub(models.Sale, 'create').resolves(createdOrder);
  //   // sinon.stub(saleService, 'createProductSale').resolves(null);
  //   // essa função está mexendo com o banco de dados e não conseguimos mockar ela
  //   const response = await saleService.createSale(newOrder);
  //   expect(response).to.be.deep.equal({ type: 200, message: createdOrder });
  // });
  // it('createSale function should not create a order', async () => {
  //   const newOrder = { order: 'order', products: ['products'] };
  //   const createdOrder = null;

  //   sinon.stub(models.Sale, 'create').resolves(createdOrder);
  //   // sinon.stub(saleService, 'createProductSale').resolves(null);
  //   // essa função está mexendo com o banco de dados e não conseguimos mockar ela
  //   const response = await saleService.createSale(newOrder);
  //   expect(response).to.be.deep.equal({ type: 409, message: { message: 'Não foi possivel cadastrar o pedido' } });
  // });
  it('getSalesByUserId function return seller orders', async () => {
    const order = { order: 'order' };
    const userId = 1;

    sinon.stub(models.Sale, 'findAll').resolves(order);
    const response = await saleService.getSalesByUserId(userId);
    expect(response).to.be.deep.equal({ type: 200, message: order})
  });
  it('getSalesByUserId function return not found error', async () => {
    const order = { order: 'order' };
    const userId = 1;

    sinon.stub(models.Sale, 'findAll').resolves(null);
    const response = await saleService.getSalesByUserId(userId);
    expect(response).to.be.deep.equal({ type: 404, message: { message: 'Pedidos não cadastrado' } })
  });
  it('updateSale function return updated order by customer', async () => {
    const status = 'Entregue';
    const id = 1;
    const payload = { id: 3 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 200, message: 'updatedOrder' });
  });
  it('updateSale function return updated order by seller first option', async () => {
    const status = 'Em Trânsito';
    const id = 1;
    const payload = { id: 2 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 200, message: 'updatedOrder' });
  });
  it('updateSale function return updated order by seller second option', async () => {
    const status = 'Preparando';
    const id = 1;
    const payload = { id: 2 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 200, message: 'updatedOrder' });
  });
  it('updateSale function return error for unauthorized user(seller try to be customer first option)', async () => {
    const status = 'Entregue';
    const id = 1;
    const payload = { id: 2 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 403, message: { message: 'Usuário não autorizado' } });
  });
  it('updateSale function return error for unauthorized user(seller try to be customer second option)', async () => {
    const status = 'Em Trânsito';
    const id = 1;
    const payload = { id: 3 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 403, message: { message: 'Usuário não autorizado' } });
  });
  it('updateSale function return error for unauthorized user(customer try to be seller first option)', async () => {
    const status = 'Em Trânsito';
    const id = 1;
    const payload = { id: 3 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 403, message: { message: 'Usuário não autorizado' } });
  });
  it('updateSale function return error for unauthorized user(customer try to be seller second option)', async () => {
    const status = 'Preparando';
    const id = 1;
    const payload = { id: 3 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 403, message: { message: 'Usuário não autorizado' } });
  });
  it('updateSale function return error for unauthorized user(customer try to be seller third option)', async () => {
    const status = 'Entregue';
    const id = 1;
    const payload = { id: 2 };

    sinon.stub(models.Sale, 'findByPk').resolves({ id: 2, userId: 3, sellerId: 2, totalPrice: 13});
    sinon.stub(models.Sale, 'update').resolves('updatedOrder');
    const response = await saleService.updateSale(status, id, payload);
    expect(response).to.be.deep.equal({ type: 403, message: { message: 'Usuário não autorizado' } });
  });
  afterEach(() => {
    sinon.restore();
  });
})