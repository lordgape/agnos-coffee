// const expect = require('chai').expect;
// const Products = require('../../db/models/Products');
// const proxyquire = require('proxyquire').noCallThru();
// const testgoose = require('testgoose');

// const newProduct = [
//   {
//     discount: {
//       label: 'Volume discount',
//       type: 'PERCENTAGE',
//       value: 19
//     },
//     currency: 'USD',
//     quantity: 2,
//     _id: '60627ed64110ec204901d06f',
//     name: 'Lenova PC',
//     sku: '10459300-5e81-4181-b998-ac38064e8a6a',
//     basePrice: 700,
//     costPrice: 500,
//     tax: 4,
//     __v: 0
//   }
// ];

// const newProductPayload = {
//   name: 'Lenova PC',
//   costPrice: '500',
//   basePrice: '700',
//   quantity: 2,
//   tax: 4,
//   discount: {
//     label: 'Volume discount',
//     type: 'PERCENTAGE',
//     value: 19
//   }
// };

// const orderMock = testgoose.model.mock();

// const OrderLibrary = proxyquire('../../library/OrderLibrary', { '../../db/models/Orders': orderMock });

// describe('OrderService', () => {
//   beforeEach(function () {
    
    
//   });

//   afterEach(function () {
    
//   });

//   it('can create new order', async () => {
//     const { name, basePrice, costPrice, tax, discount } = newProductPayload;

//     const result = await OrderLibrary.createNewProduct(name, basePrice, costPrice, tax, discount);    

//     expect(result).to.deep.equal(newProduct);
//   });

//   // it('can list all product and sort by date', async () => {

//   //   const MyMockProduct = sinon.mock(Products);

//   //   MyMockProduct.expects('find').select('-__v').resolves(newProduct);

//   //   const result = await ProductLibrary.listProductSortedByDate();

    

//   //   expect(result).to.deep.equal(newProduct);
//   // });
// });
