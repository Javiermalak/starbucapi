(function()
{
  class Model
  {
    constructor(data = {})
    {
      this.data = data;
    }

    getter(k)
    {
      return k
        ? this.data[k]
        : this.data;
    }

    setter(v,k)
    {
      if(k)
      {
        this.data[k] = v;
      }
      else
      {
        this.data = v;
      }
    }
  }
  module.exports = Model;
})();
