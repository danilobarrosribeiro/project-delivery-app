const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../api/services/products.service');
const models = require('../../../database/models');

describe('Products service unit tests', () => {
  it('getAll function', async () => {
    const productsArray = ['products'];
    const type = 200;

    sinon.stub(models.Product, 'findAll').resolves(productsArray);
    const response = await productsService.getAll();
    expect(response).to.be.deep.equal({ type, message: productsArray });  
  });
})