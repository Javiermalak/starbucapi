(function()
{
  module.exports = function(app)
  {
    var Controller = require('../controllers/Root.controller.js');

    app.route('/')
      .get(Controller.get)
      .post(Controller.post)
      .put(Controller.put)
      .delete(Controller.delete)
  }
})();
