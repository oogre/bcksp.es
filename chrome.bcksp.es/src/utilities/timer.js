/*----------------------------------------*\
  bcksp.es - timer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:21:29
  @Last Modified time: 2019-01-04 21:54:01
\*----------------------------------------*/
import Data from "./Data.js";
import { isFunction } from "./validation.js";

export async function procrastinate(delay, name="default"){
	return new Promise((resolve, reject) => {
		let procrastinations = Data.state.procrastinations;
		let timers = Data.state.timers;
		if(timers[name] !== undefined){
			clearTimeout(timers[name]);
			if(isFunction(procrastinations[name])){
				procrastinations[name](new Error("I'll do : "+name+" later..."));
			}
		}
		procrastinations[name] = reject;
		
		timers[name] = setTimeout(() => {
			clearTimeout(timers[name]);
			timers[name] = undefined;
			Data.setState({
				timers : timers
			});
			resolve("It's time for : " + name);
		}, delay);
		
		Data.setState({
			procrastinations : procrastinations,
			timers : timers
		});
	});
}