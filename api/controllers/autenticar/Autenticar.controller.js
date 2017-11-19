(function()
{
  'use strict';

  var sqlTool = require('../../tools/sql/sql.tool.js');

  var _CR = require('../../tools/response/response.tool.js');

  var model = new (require('../../models/usuario/Usuario.model.js'))();

  function autenticar(req, res)
  {
    let { us_correo, us_contrasena } = req.body;

    if( us_correo && us_contrasena )
    {
      let matches = [
        ['us_correo',us_correo],
        ['us_contrasena',us_contrasena]
      ];

      model.autenticar(matches, function(response, err)
      {
        if(!response)
        {
          res.send(_CR.getResponse(null, err, false))
          res.end()
        }
        else
        {
          res.send(_CR.getResponse({autorizado: response.length>0}, 'OK', true))
          res.end()
        }
      });
    }
    else
    {
      res.send(_CR.getResponse(null, 'Datos faltantes.', false))
      res.end()
    }
  }

  module.exports = autenticar;
})()
