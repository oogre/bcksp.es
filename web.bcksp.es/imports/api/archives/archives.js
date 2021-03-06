/*----------------------------------------*\
  bcksp.es - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2020-02-25 22:20:55
\*----------------------------------------*/
import EasyEnum from "./../EasyEnum.js";

export const Archives = new Mongo.Collection('archives');

Archives.helpers({
  populate: function () {
  	this.type = Archives.Type.getName(this.type);
  	return this;
  }
});

Archives.Type = EasyEnum({
  PUBLIC : 0,
  PRIVATE : 1,
});