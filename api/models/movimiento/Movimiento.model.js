(function()
{
  var RestModel = require('../RestModel.model.js');

  class Movimiento extends RestModel
  {
    constructor(data)
    {
      let rc =
      [
        { name:'mo_fecha' , nn: true },
        { name:'mo_tipo_movimiento' , nn: true },
        { name:'mo_ticket' , nn: true },
        { name:'mo_usuario' , nn: true },
        { name:'mo_mensaje' , nn: false }
      ];

      let pk =  'mo_id';

      let table = 'starbuc.movimientos';

      super(data, rc, pk, table);
    }
  }

  module.exports = Movimiento;
})();
