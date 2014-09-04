exports.Deffered = function Deffered (){
	var Process = function(){
		var _stack = [];
		var _content = undefined;
		var _trigged = false;
		var _add = function(fnc){
			_isFunction(fnc) && _trigged ? fnc(_content) : _stack.push(fnc);
		};
		var _trigger = function(object){
			_trigged = true;
			_content = object;
			_stack.map(function(elem){ elem(_content) });
		};
		var _isFunction = function (fnc){
			var getType = {};
			return fnc && getType.toString.call(fnc) === '[object Function]';
		};
		return{
			add : function(fnc){
				_add(fnc);
			},
			trigger : function(object){
				_trigger(object);
			}
		}
	};

	// WHEN Deffered IS A COMPLETE SUCCESS
	// TRIGGED by RESOLVE
	var _done = new Process();

	// WHEN Deffered FALL ON EXTERNAL ERROR
	// TRIGGED by REJECT
	var _fail = new Process();
	
	// WHEN Deffered FALL ON INTERNAL ERROR
	// TRIGGED by THROW
	var _error = new Process();


	// COMBINE		
	// WHEN DONE, FAIL, ERROR
	var _always = new Process();
	// WHEN FAIL, ERROR
	var _echec = new Process();

	return {
		always : function(fnc){
			_always.add(fnc);
			return this;
		},
		done : function(fnc){
			_done.add(fnc);
			return this;
		},
		fail : function(fnc){
			_fail.add(fnc);
			return this;
		},
		error : function(fnc){
			_error.add(fnc);
			return this;
		},
		echec : function(fnc){
			_echec.add(fnc);
			return this;
		},
		resolve : function(object){
			_done.trigger(object);
			
			_always.trigger(object);
			return this;
		},
		reject : function(object){
			_fail.trigger(object);
			
			_always.trigger(object);
			_echec.trigger(object);
			return this;
		},
		throw : function(object){
			_error.trigger(object);
			
			_always.trigger(object);
			_echec.trigger(object);
			return this;
		}
	};
};