const cors = require('cors')

module.exports = app => {
  const corsOptions = {
    origin: [],
    optionsSuccessStatus: 200, // some legacy browsers (IE11', ' various SmartTVs) choke on 204', '
  }

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(cors(corsOptions));
  return app;
}
