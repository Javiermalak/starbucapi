(function()
{
  var RestModel = require('../RestModel.model.js');

  class Plantel extends RestModel
  {
    constructor(data)
    {
      let rc =
      [
        { name:'pl_nombre' , nn: true }
      ];

      let pk =  'pl_id';

      let table = 'starbuc.planteles';

      super(data, rc, pk, table);
    }
  }

  module.exports = Plantel;
})();
