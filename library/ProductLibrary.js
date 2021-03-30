const Products = require('../db/models/Products');
const UUID = require('uuid');

module.exports = {
  createNewProduct: async (name, basePrice, costPrice, tax, quantity, discount) => {
    const newProduct = new Products({
      name: name,
      sku: UUID.v4(),
      basePrice: basePrice,
      costPrice: costPrice,
      tax: tax,
      quantity: quantity
    });

    if (discount) {
      newProduct.discount = discount;
    }

    return newProduct.save();
  },

  listProductSortedByDate: async () => {
    console.log('I got here');
    return Products.find();
  }

};
