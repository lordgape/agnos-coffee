const expect = require('chai').expect;
const sinon = require('sinon');
const ProductLibrary = require('../../library/ProductLibrary');
const Products = require('../../db/models/Products');
const mongoose = require('mongoose');

const newProduct = {
  discount: {
    label: 'Volume discount',
    type: 'PERCENTAGE',
    value: 19
  },
  currency: 'USD',
  quantity: 2,
  _id: '60627ed64110ec204901d06f',
  name: 'Lenova PC',
  sku: '10459300-5e81-4181-b998-ac38064e8a6a',
  basePrice: 700,
  costPrice: 500,
  tax: 4,
  __v: 0
};

const newProductPayload = {
  name: 'Lenova PC',
  costPrice: '500',
  basePrice: '700',
  quantity: 2,
  tax: 4,
  discount: {
    label: 'Volume discount',
    type: 'PERCENTAGE',
    value: 19
  }
};

describe('ProductService', () => {
  

  it('can create new product', async () => {
    const { name, basePrice, costPrice, tax, quantity, discount } = newProductPayload;

    sinon.stub(Products.prototype, 'save').returns(newProduct);

    const result = await ProductLibrary.createNewProduct(name, basePrice, costPrice, tax, quantity, discount);

    expect(result).to.deep.equal(newProduct);
  });

  it('can list all product', async () => {
    
    sinon.stub(mongoose.Model, 'find').returns(newProduct);

    const result = await ProductLibrary.listProductSortedByDate();

    expect(result).to.deep.equal(newProduct);
  });
});
