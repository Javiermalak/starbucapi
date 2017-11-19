(function()
{
  module.exports = function(app)
  {
    var Controller = require('../../controllers/plantel/Plantel.controller.js');

    app.route('/plantel')
      .get(Controller.get)
      .post(Controller.post)
      .put(Controller.put)
      .delete(Controller.delete)

    app.route('/planteles')
      .get(Controller.getAll)
      .delete(Controller.deleteAll)
  }
})();
