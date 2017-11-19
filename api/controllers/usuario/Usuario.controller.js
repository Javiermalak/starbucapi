(function()
{
  var model = require('../../models/usuario/Usuario.model.js');
  var controller = new (require('../RestController.model.js'))(model);

  exports.get = (req, res) => controller.get(req, res);

  exports.getAll = (req, res) => controller.getAll(req, res);

  exports.post = (req, res) => controller.post(req, res);

  exports.put = (req, res) => controller.put(req, res);

  exports.delete = (req, res) => controller.delete(req, res);

  exports.deleteAll = (req, res) => controller.deleteAll(req, res);

  exports.autenticar = (req, res) => new model().autenticar(req, res);

})();
