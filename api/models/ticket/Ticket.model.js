(function()
{
  var RestModel = require('../RestModel.model.js');

  class Ticket extends RestModel
  {
    constructor(data)
    {
      let rc =
      [
        { name:'ti_estado' , nn: true },
        { name:'ti_fecha_alta' , nn: true },
        { name:'ti_fecha_cierre' , nn: false , default: '0001-01-01T00:00:00.000Z'},
        { name:'ti_pregunta' , nn: true },
        { name:'ti_calificacion' , nn: false , default: '-1'},
        { name:'ti_asunto' , nn: true },
        { name:'ti_usuario' , nn: true }
      ];

      let pk =  'ti_id';

      let table = 'starbuc.tickets';

      super(data, rc, pk, table);
    }
  }

  module.exports = Ticket;
})();
