(function()
{
  var Model = require('./Model.model.js');

  var sqlTool = require('../tools/sql/sql.tool.js');

  class RestModel extends Model
  {
    constructor(data, rc = [], key = 'id', table = 'table')
    {
      super(data);
      this.requiredColumns = rc;
      this.key = key;
      this.table = table
    }

    getTable()
    {
      return this.table;
    }

    getKey()
    {
      return this.key;
    }

    getRequiredColumns()
    {
      return this.requiredColumns;
    }

    post(callback = () => {})
    {
      let data = this.getPostData();

      sqlTool.insert(data, function(res,err)
      {
        if(err)
        {
          callback(false, 'RestModel post action err: ' + err);
        }
        else
        {
          callback(res)
        }
      });
    }

    get(match, callback = () => {})
    {
      let data = this.getGetData(match);
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

    delete(match, callback = () => {})
    {
      let data = this.getGetData(match);

      sqlTool.delete(data, function(res, err)
      {
        if(err)
        {
          callback(false, 'RestModel delete action err: ' + err);
        }
        else
        {
          callback(res)
        }
      });
    }

    put(data = {}, callback = () => {})
    {
      data = this.getPutData(data);

      sqlTool.put(data, function(res, err)
      {
        if(err)
        {
          callback(false, 'RestModel put action err: ' + err);
        }
        else
        {
          callback(res)
        }
      });
    }

    getPostData()
    {
      return {
        key: this.key,
        fields: this.requiredColumns
          .map( e => e.name ),
        values: this.requiredColumns
          .map( e => this.data[e.name] == undefined || this.data[e.name] == '' ? e.default :this.data[e.name] ),
        table: this.table
      }
    }

    getPutData(data)
    {
      return {
        matches: data.matches || [[]],
        match: data.match || -1,
        table: this.table,
        key: this.key
      }
    }

    getGetData(match)
    {
      return {
        multiQuery: typeof(match) == 'object',
        matches: typeof(match) == 'object' ?  match : [[]],
        match: typeof(match) == 'object' ? undefined : match,
        table: this.table,
        key: this.key
      }
    }

    // TODO: ¿EVALUAR TYPEOF TAMBIEN?
    isValid(matches, allowEmpty = true)
    {
      let f = true;
      if(matches)
      {
        let mn = this.requiredColumns.map( col => col.name );
        for (let match of matches)
        {
            f = mn.indexOf(match[0]) != -1 ? f : false ;
        }
        if(!allowEmpty)
        {
          f =  matches.length > 0 ? f : false;
          console.log(f);
        }
      }
      else
      {
        for (let col of this.requiredColumns)
        {
          if(col.nn)
          {
            // TODO: VER QUE PEX CON LA PROPIEDAD NOT NULL ¿QUE MÁS EVALUAR?
            f = this.data[col.name] == undefined ||  this.data[col.name] === '' ? false : f;
          }
          else
          {
            // f = this.data[col.name] == undefined ? false : f;
          }
        }
      }
      // TODO: REGRESAR TAMBIEN ARRAY DE COLUMNAS FALTANTES
      return f;
    }
  }

  module.exports = RestModel;
})();
