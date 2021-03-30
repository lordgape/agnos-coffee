const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const db = require("./db/index");

require('./middlewares')(app);

// Setup route
const route = require('./routes/route');
route(app);


//Connect to MonoDb
db.connect()
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(`Oops an error occurs ${err.message || ''} ${JSON.stringify(err)}`));


//Set up port
const PORT = global.process.env.PORT || 5000;


io.on('connection', () => {
  console.log('connected to socket');
});



http.listen(PORT, () => {
  console.log(`Server is listening to request on  ${PORT}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject


