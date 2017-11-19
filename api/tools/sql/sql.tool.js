(function()
{
  var mssql = require('mssql');

  var sqlFormater = require('./sql-formater/sql-formater.tool.js');

  var _dataConnection  =
  {
      server: 'starbuc.database.windows.net',
      database: 'starbucDb',
      user: 'javimalak',
      password: 'Javiervega1996',
      options:{
        encrypt: true
      }
  };

  function getConnection()
  {
    let conn = false;

    try
    {
      conn = new mssql.ConnectionPool(_dataConnection);
    }
    catch(e)
    {
      console.log('getConnection error: '+e);
    }

    return conn;
  }

  exports.insert = function( data = {} , callback = () => {} )
  {
    // TODO: SI NO CUMPLE CON ESTE FORMATO, REGRESAR ALGO PARA QUE LA QUERY MARQUE EXCEPCIÓN, NO LA CONEXIÓN.
    let { fields = [] , values = [] , table = 'table', key = 'id' } = data;


    let conn = undefined;

    if(conn = getConnection())
    {
      conn.connect()
      .then( () =>
      {
        let req = new mssql.Request(conn);

        let query = 'INSERT INTO ' + table + ' ' + sqlFormater.wrap(fields,true) + ' VALUES' + sqlFormater.wrap(values) + ';';
        // query += 'SELECT ' + key + ' AS LastID FROM ' + table + ' WHERE ' + key + ' = @@Identity;';
        query += 'SELECT * FROM ' + table + ' WHERE ' + key + ' = @@Identity;';
        console.log(query);
        req.query(query)
          .then( recordset =>
          {
            callback(recordset.recordset[0]);
            conn.close();
          })
          .catch( err =>
          {
            callback(false,'query error: '+err);
            conn.close();
          })
      })
      .catch( err =>
      {
        callback(false, 'connection error: '+err);
      })
    }
    else
    {
        callback(false, 'error creating connection.');
    }
  }

  exports.select = function(data = {}, callback = () => {})
  {
    // TODO: SI NO CUMPLE CON ESTE FORMATO, REGRESAR ALGO PARA QUE LA QUERY MARQUE EXCEPCIÓN, NO LA CONEXIÓN.
    let { key = 'id' , match = -1 , multiQuery = false , matches = [] , table = 'table' } = data;

    let conn = undefined;
    if(conn = getConnection())
    {
      conn.connect()
        .then( () =>
        {
          let req = new mssql.Request(conn);

          let query = 'SELECT * FROM ' + table;

          if(matches.length>0)
          {
            query += ' WHERE ' +
            ( multiQuery
              ? sqlFormater.expressionArray(matches)
              : key + " = '" + match + "'"
            )
          }
          query += ';';

          req.query(query)
            .then( recordset =>
            {
              callback(recordset.recordset)
              conn.close();
            })
            .catch( err =>
            {
              callback(false, 'connection error: '+err);
            });

        })
        .catch( err =>
        {
          callback(false, 'connecting error: '+ err);
        })
    }
    else
    {
      callback(false, 'error creating connection');
    }
  }

  exports.put = function(data = {}, callback = () => {})
  {
    // TODO: SI NO CUMPLE CON ESTE FORMATO, REGRESAR ALGO PARA QUE LA QUERY MARQUE EXCEPCIÓN, NO LA CONEXIÓN.
    let { key = 'id' , match = -1 , matches = [] , table = 'table' } = data;

    let conn = undefined;

    if(conn = getConnection())
    {
      conn.connect()
        .then( () =>
        {
          let req = new mssql.Request(conn);

          let query = 'UPDATE ' + table + ' SET ';

          query += sqlFormater.expressionArray(matches,' ,',true);

          query += ' WHERE ' +key + " = '" + match + "';";

          query += 'SELECT * FROM ' + table + ' WHERE ' + key + ' = '+ match + ';';

          req.query(query)
            .then( recordset =>
            {
              callback(recordset.recordset[0])
              conn.close();
            })
            .catch( err =>
            {
              callback(false, 'connection error: '+err);
            });

        })
        .catch( err =>
        {
          callback(false, 'connecting error: '+ err);
        })
    }
    else
    {
      callback(false, 'error creating connection');
    }
  }



  exports.delete = function(data = {}, callback = () => {})
  {
    // TODO: SI NO CUMPLE CON ESTE FORMATO, REGRESAR ALGO PARA QUE LA QUERY MARQUE EXCEPCIÓN, NO LA CONEXIÓN.
    let { key = 'id' , match = -1 , multiQuery = false , matches = [] , table = 'table' } = data;

    let conn = undefined;

    if(conn = getConnection())
    {
      conn.connect()
        .then( () =>
        {
          let req = new mssql.Request(conn);

          let query = 'DELETE FROM ' + table;

          if(matches.length>0)
          {
            query += ' WHERE ' +
            ( multiQuery
              ? sqlFormater.expressionArray(matches)
              : key + " = '" + match + "'"
            )
          }
          query += ';';
          query += 'select @@ROWCOUNT As "deleted rows";';

          req.query(query)
            .then( recordset =>
            {
              callback(recordset.recordset[0])
              conn.close();
            })
            .catch( err =>
            {
              callback(false, 'connection error: '+err);
            });

        })
        .catch( err =>
        {
          callback(false, 'connecting error: '+ err);
        })
    }
    else
    {
      callback(false, 'error creating connection');
    }
  }
})();
