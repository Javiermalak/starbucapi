(function()
{
  var port = process.env.PORT || 1337;
  var express = require('express');
  var bodyParser = require('body-parser');
  var app = express();

  config();
  run();

  function main()
  {
    console.log('Running on '+port);
  }

  function config()
  {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(function(req, res, next)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    setRoutes();
  }

  function run()
  {
    app.listen(port, main);
  }

  function setRoutes()
  {
    [
      require('./api/routes/Root.route.js'),
      require('./api/routes/plantel/Plantel.route.js'),
      require('./api/routes/usuario/Usuario.route.js'),
      require('./api/routes/movimiento/Movimiento.route.js'),
      require('./api/routes/ticket/Ticket.route.js'),
      require('./api/routes/autenticar/Autenticar.route.js')
    ]
      .forEach( e => e(app) )
  }

})();
