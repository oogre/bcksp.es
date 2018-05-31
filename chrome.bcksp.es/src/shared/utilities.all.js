/*----------------------------------------*\
  bcksp.es - utilities.all.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-31 09:39:20
  @Last Modified time: 2018-05-31 09:39:51
\*----------------------------------------*/
import Multi from "./Multi.inherit.js";
import UtilitiesIcon from "./utilities.icon.js";
import UtilitiesArchive from "./utilities.archive.js";
import UtilitiesBackspace from "./utilities.backspace.js";
import UtilitiesBlacklist from "./utilities.blacklist.js";
import UtilitiesValidation from "./utilities.validation.js";

export default class Utilities extends Multi.inherit( UtilitiesIcon, UtilitiesBackspace, UtilitiesArchive, UtilitiesBlacklist, UtilitiesValidation ) {
}