// Import routes
const productsRoute = require('./api/productsRoute');
const orderssRoute = require('./api/ordersRoute');

module.exports = function (app) {
  app.use('/api/products', productsRoute);
  app.use('/api/orders', orderssRoute);

  app.use(function (req, res) {
    if (req.url == '/') {
      // res.sendFile('/home/chesvic/Documents/javascript-projects/agnos-coffee-shop/index.html')
      res.json({ code: 'SUCCESS', response: 'agnos-coffee-shop server is in good health', error: '' });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.json({ code: 'Not_found', response: '', error: 'Resource not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
};
