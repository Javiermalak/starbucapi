(function()
{
  module.exports = function(app)
  {
    var Controller = require('../../controllers/movimiento/Movimiento.controller.js');

    app.route('/movimiento')
      .get(Controller.get)
      .post(Controller.post)
      .put(Controller.put)
      .delete(Controller.delete)

    app.route('/movimientos')
      .get(Controller.getAll)
      .delete(Controller.deleteAll)
  }
})();
