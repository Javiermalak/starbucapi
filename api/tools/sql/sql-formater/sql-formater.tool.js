(function()
{
  /**
   * Formatea un arreglo de elementos N de N tal que ( '00' [op] '01' , '10' [op] '11' , ... , 'N0' [op] 'N1')
   * @method expressionArray
   * @param  array    Array de arrays a formatear
   * @param  string   operador que se utilizará
   * @param  boolean  ignorar brackets
   * @return string Array formateado
   */
  function expressionArray(matches, exp = 'AND' , nobrack = false)
  {
    return matches
      .map( m =>
        (nobrack ? "" : "(") + m[0] + " = '" + m[1] + "'" + (nobrack ? "" : ")")
      ).join(' ' + exp + ' ');
  }

  /**
   * Formatea un arrego de elemetos N tal que ('0','1','...','N')
   * @method wrap
   * @param  object    Array a formatear
   * @param  boolean   ignorar apostrofes
   * @param  boolean   ignorar brackets
   * @return string    Array formateado
   */
  function wrap(array, noapos = false, nobrack = false)
  {
      return (
        ( nobrack ? "" : "(" ) +
        ( noapos ? "" : "'"  )
      ) +
      array.join(( noapos ? "," : "','" )) +
      (
        ( noapos ? "" : "'" ) +
        ( nobrack ? "" : ")" )
      )
  }

  exports.wrap = wrap;

  exports.expressionArray = expressionArray
})();
