/*----------------------------------------*\
  bcksp.es - log.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:29:40
  @Last Modified time: 2019-01-05 00:19:50
\*----------------------------------------*/

let LOG_LVLS = {
	OFF : -1,
	ERROR : 0,
	WARN : 1,
	TRACE : 2,
	INFO : 3,
	LOG : 4
};

let LOG_LVL = LOG_LVLS.LOG;

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