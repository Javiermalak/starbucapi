(function()
{
  var customResponse = require('../tools/response/response.tool.js');

  var _CR = customResponse;

  class RestController
  {
    constructor(model)
    {
      this.model = model;
    }

    get(req, res)
    {
      let id = req.query[new this.model().getKey()];

      this._get(id, res, true);
    }

    getAll(req, res)
    {
      let matches = [];

      for (let match in req.query)
      {
        matches.push([match,req.query[match]]);
      }

      this._get(matches,res);
    }

    _get(match, res, singleRes = false)
    {
      let aux = new this.model();

      if(this._tryDinamicEntry(match))
      {
        aux.get(match,function(response,err)
        {
          if(err)
          {
            res.send(_CR.getResponse(null, err, false));
            res.end();
          }
          else
          {
            if(singleRes)
            {
              res.send(_CR.getResponse(response[0], 'OK'));
            }
            else
            {
              res.send(_CR.getResponse(response, 'OK'));
            }
            res.end();
          }
        });
      }
      else
      {
        res.send(_CR.getResponse(null, 'Datos requeridos faltantes.', false));
        res.end();
      }
    }

    post(req, res)
    {
      let aux = new this.model(req.body);

      if(aux.isValid())
      {
        aux.post(function(response,err)
        {
          if(err)
          {
            res.send(_CR.getResponse(null, err, false));
            res.end();
          }
          else
          {
            res.send(_CR.getResponse(response, 'Modelo agregado'));
            res.end();
          }
        });
      }
      else
      {
        res.send(_CR.getResponse(null, 'Datos requeridos faltantes.', false));
        res.end();
      }
    }

    put(req, res)
    {
      let matches = [];

      for (let match in req.body.datos)
      {
        matches.push([match,req.body.datos[match]]);
      }

      let match = req.body.id;

      let data = {
        matches: matches,
        match: match
      }

      let aux = new this.model();

      if(aux.isValid(matches) && matches.length > 0 && match != undefined )
      {
        aux.put(data,function(response,err)
        {
          if(err)
          {
            res.send(_CR.getResponse(null, err, false));
            res.end();
          }
          else
          {
            res.send(_CR.getResponse(response, 'OK'));
            res.end();
          }
        });
      }
      else
      {
        res.send(_CR.getResponse(null, 'Datos incorrectos.', false));
        res.end();
      }
    }

    delete(req, res)
    {
      let id = req.body[new this.model().getKey()];
      this._delete(id, res);
    }

    deleteAll(req, res)
    {
      let matches = [];

      let body = req.body;

      let erAll = body.borrarTodo === true ? true : undefined;

      delete body.borrarTodo;

      for (let match in body)
      {
        matches.push([match,body[match]]);
      }

      this._delete(matches, res, erAll);
    }

    _delete(match, res, erAll)
    {
      let aux = new this.model();

      if(this._tryDinamicEntry(match, false) || erAll)
      {
        aux.delete(match,function(response,err)
        {
          if(err)
          {
            res.send(_CR.getResponse(null, err, false));
            res.end();
          }
          else
          {
            res.send(_CR.getResponse(response, 'OK'));
            res.end();
          }
        });
      }
      else
      {
        res.send(_CR.getResponse(null, 'Datos requeridos faltantes.', false));
        res.end();
      }
    }

    _tryDinamicEntry(match, allowEmpty)
    {
      let aux = new this.model();

      let single = typeof(match) != 'object';

      return single ?  match != undefined :  aux.isValid(match,allowEmpty);
    }
  }


  module.exports = RestController;
})();
