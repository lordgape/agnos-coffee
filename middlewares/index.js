
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const responseTime = require('response-time');
const corsOptions = require('./corsSetup');
const limiter = require('express-rate-limit');
const bodyParser = require('body-parser');

module.exports = (app) => {
  corsOptions(app);

  app.use(helmet());
  app.use(compression());
  app.use(responseTime());

  // Setup parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Set Rate limter per API per IP
  const allAPILimit = new limiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(allAPILimit);


  if (global.process.env.NODE_ENV !== 'testing') {
    morgan.token('payload', function (req, res) {
      return JSON.stringify(req.body);
    });
    app.use(
      morgan(
        ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent" ":payload"',
        {
          // eslint-disable-next-line object-shorthand
          skip: function (req, res) {
            // Ignore healthcheck so it doesn't flood logger
            return req.originalUrl === '/';
          },
        },
      ),
    );
  }
};
