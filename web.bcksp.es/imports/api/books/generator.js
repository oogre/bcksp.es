/*----------------------------------------*\
  bcksp.es - generator.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-06-02 19:14:06
  @Last Modified time: 2018-10-02 13:13:04
\*----------------------------------------*/
import { Archives } from './../archives/archives.js';
import Book from './tools.js';




let archive = Archives.findOne({
	type : 1
}, {
	fields : {
		backspaces : 1,
		createdAt : 1, 
		updatedAt : 1
	}
})
/*

let backspaces = archive.backspaces.join(" ");


new Book(
	'/Users/ogre/works/8102/bcksp.es/output.pdf', 
	'/Users/ogre/works/8102/bcksp.es/NotoMono-Regular.ttf',
	archive.createdAt, archive.updatedAt,
	backspaces+" "+backspaces+" "+backspaces+" "+backspaces+" "+backspaces
);
*/