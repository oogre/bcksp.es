/*----------------------------------------*\
  bcksp.es - log.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:29:40
  @Last Modified time: 2019-05-07 16:56:12
\*----------------------------------------*/

let LOG_LVLS = {
	OFF : -1,
	ERROR : 0,
	LOG : 1,
	INFO : 2,
	WARN : 3,
	TRACE : 4
};

let LOG_LVL = LOG_LVLS.WARN;

export function log(...data){
	if(LOG_LVL >= LOG_LVLS.LOG){
		console.log.apply(this, [(new Date()).toISOString()].concat(data));
	}
}

export function info(...data){
	if(LOG_LVL >= LOG_LVLS.INFO){
		console.info.apply(this, [(new Date()).toISOString()].concat(data));
	}
}

export function trace(...data){
	if(LOG_LVL >= LOG_LVLS.TRACE){
		console.trace.apply(this, [(new Date()).toISOString()].concat(data));
	}
}

export function warn(...data){
	if(LOG_LVL >= LOG_LVLS.WARN){
		console.warn.apply(this, [(new Date()).toISOString()].concat(data));
	}
}

export function error(...data){
	if(LOG_LVL >= LOG_LVLS.ERROR){
		console.error.apply(this, [(new Date()).toISOString()].concat(data));
	}
}