(function()
{
  var controller = new (require('../RestController.model.js'))
  (
    new require('../../models/ticket/Ticket.model.js')
  );

  exports.get = (req, res) => controller.get(req, res);

  exports.getAll = (req, res) => controller.getAll(req, res);

  exports.post = (req, res) => controller.post(req, res);

  exports.put = (req, res) => controller.put(req, res);

  exports.delete = (req, res) => controller.delete(req, res);

  exports.deleteAll = (req, res) => controller.deleteAll(req, res);

})();
