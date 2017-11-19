(function()
{
  module.exports = function(app)
  {
    var Controller = require('../../controllers/usuario/Usuario.controller.js');

    app.route('/usuario')
      .get(Controller.get)
      .post(Controller.post)
      .put(Controller.put)
      .delete(Controller.delete)

    app.route('/usuario/autenticar')
      .get(Controller.autenticar)


    app.route('/usuarios')
      .get(Controller.getAll)
      .delete(Controller.deleteAll)
  }
})();
