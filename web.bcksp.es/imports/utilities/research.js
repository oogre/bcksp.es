/*----------------------------------------*\
  bcksp.es - research.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-04-09 18:12:24
  @Last Modified time: 2020-04-09 18:40:15
\*----------------------------------------*/


export function strike(input, stroke="\u0336"){
	let output = "";
	for(let c of input){
		output+=c + stroke;
	}
	return output
}


export function allUnicode(){

	let max = 16 * 16 * 16;
	for(let i = 0 ; i < max ; i ++){

		
		console.log( String.fromCharCode(i));
	}

}