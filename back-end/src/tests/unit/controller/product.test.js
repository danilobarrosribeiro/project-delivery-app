const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { getAll } = require('../../../api/controllers/products.controller');
const productService = require('../../../api/services/products.service');

const { expect } = chai;
chai.use(sinonChai);

describe('products controller layer tests', () => {
  it('getAll function', async () => {
    const req = {};
    const res = {};
    const type = 200;
    const message = { message: 'message' };

    sinon.stub(productService, 'getAll').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getAll(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });
  afterEach(() => {
    sinon.restore();
  });
})