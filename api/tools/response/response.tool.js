(function()
{

  /**
   * Formatea un una respuesta de servidor estandar.
   * @method
   * @param  object  Resultado del servicio consumido
   * @param  string  Mensaje de respuesta del servicio consumido
   * @param  boolean Estado de la consulta del servicio consumido
   * @return object  Parametros de llegada formateados
   */
  exports.getResponse = function(data = null, message = '', status = true)
  {
    return {
        status: status,
        message: message,
        data: data
    }
  }
})();
