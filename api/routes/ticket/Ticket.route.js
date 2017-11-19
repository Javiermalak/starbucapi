(function()
{
  module.exports = function(app)
  {
    var Controller = require('../../controllers/ticket/Ticket.controller.js');

    app.route('/ticket')
      .get(Controller.get)
      .post(Controller.post)
      .put(Controller.put)
      .delete(Controller.delete)

    app.route('/tickets')
      .get(Controller.getAll)
      .delete(Controller.deleteAll)
  }
})();
