const { expect } = require('chai');
const sinon = require('sinon');
const sellerService = require('../../../api/services/seller.service');
const models = require('../../../database/models');

describe('Seller Service unit tests', () => {
  it('getSalesBySellerId function return sellers', async () => {
    const sellerId = 1;
    const sales = ['sales'];

    sinon.stub(models.Sale, 'findAll').resolves(sales);
    const response = await sellerService.getSalesBySellerId(sellerId);
    expect(response).to.be.deep.equal({ type: 200, message: sales });
  });
  it('getSalesBySellerId function return error', async () => {
    const sellerId = 1;
    const sales = null;

    sinon.stub(models.Sale, 'findAll').resolves(sales);
    const response = await sellerService.getSalesBySellerId(sellerId);
    expect(response).to.be.deep.equal({ type: 404, message: { message: 'Pedido não cadastrado' } });
  });
  afterEach(() => {
    sinon.restore();
  });
})