(function()
{
  var RestModel = require('../RestModel.model.js');

  var sqlTool = require('../../tools/sql/sql.tool.js');

  class Usuario extends RestModel
  {
    constructor(data)
    {
      let rc =
      [
        { name:'us_nombre' , nn: true },
        { name:'us_correo' , nn: true },
        { name:'us_contrasena' , nn: true },
        { name:'us_tipo_usuario' , nn: true },
        { name:'us_plantel' , nn: true}
      ];

      let pk =  'us_id';

      let table = 'starbuc.usuarios';

      super(data, rc, pk, table);
    }

    autenticar(data = {}, callback = () => {})
    {
      data = this.getGetData(data);

      sqlTool.select(data, function(res, err)
      {
        if(err)
        {
          callback(false, 'RestModel get action err: ' + err);
        }
        else
        {
          callback(res)
        }
      });
    }
  }

  module.exports = Usuario;
})();
