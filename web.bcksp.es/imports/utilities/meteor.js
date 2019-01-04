/*----------------------------------------*\
  bcksp.es - meteor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 16:12:39
  @Last Modified time: 2019-01-03 16:16:02
\*----------------------------------------*/

export async function resetPassword(token, pwd){
	return new Promise((resolve, reject)=>{
		Accounts.resetPassword(token, pwd, (err) => {
			if(err) return reject(err);
			return resolve();
		});
	});
}