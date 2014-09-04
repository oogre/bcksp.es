var StringStream = function(){
	var _buffer = '';
	var _sender = function(){};
	var _isEmpty = function(){
		return 0 === _buffer.length;
	};
	var _add = function(str){
		_buffer += str;
	};
	var _get = function(all){
		var c = '';
		if('*' === all){
			c = _buffer;
			_buffer = '';
		}else{
			c = _buffer.substr(0,1);
			_buffer = _buffer.substr(1);
		}
		return c;
	};
	var _setSender = function(sender){
		_sender = sender;
	};
	var _send = function(){
		while(!_isEmpty())_sender(_get('*'));
	};
	return {
		add : function(str){
			return _add(str);
		},
		get : function(){
			return _get();
		},
		isEmpty : function(){
			return _isEmpty();
		},
		toString : function(){
			return _buffer;
		},
		setSender : function(sender){
			_setSender(sender);
			return this;
		},
		send : function(){
			_send();
			return this;
		}
	};
};