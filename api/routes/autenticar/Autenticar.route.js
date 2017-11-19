(function()
{
  'use strict';

  module.exports = function(app)
  {
    var Controller = require('../../controllers/autenticar/Autenticar.controller.js');

    app.route('/autenticar')
      .post(Controller)
  }
})()
