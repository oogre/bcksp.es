/*----------------------------------------*\
  bcksp.es - Aggregation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-25 23:58:30
  @Last Modified time: 2018-05-26 00:31:30
\*----------------------------------------*/

// Class for creating multi inheritance.
export default class multi{
  // Inherit method to create base classes.
  static inherit(..._bases)
  {
    class classes {

      // The base classes
        get base() { return _bases; }

      constructor(..._args)
      {
        var index = 0;

        for (let b of this.base) 
        {
          let obj = new b(_args[index++]);
            multi.copy(this, obj);
        }
      }
    
    }

    // Copy over properties and methods
    for (let base of _bases) 
    {
        multi.copy(classes, base);
        multi.copy(classes.prototype, base.prototype);
    }

    return classes;
  }

  // Copies the properties from one class to another
  static copy(_target, _source) 
  {
        for (let key of Reflect.ownKeys(_source)) 
      {
            if (key !== "constructor" && key !== "prototype" && key !== "name") 
        {
                let desc = Object.getOwnPropertyDescriptor(_source, key);
                Object.defineProperty(_target, key, desc);
            }
        }
  }
}