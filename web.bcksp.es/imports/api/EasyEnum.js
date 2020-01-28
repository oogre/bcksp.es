/*----------------------------------------*\
  bcksp.es - dbConstTools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-25 15:23:53
  @Last Modified time: 2020-01-28 23:17:15
\*----------------------------------------*/


const tools = {
	each : function(cb) {
		return _.map(this, (v, k) => ( this.hasValue(v) ? cb(v, k) : null ) );
	},
	hasValue : function(value){
		return !!this.properties[value];
	},
	getName : function(value){
		return this.properties[value].name;
	},
	checkValid : function(value, origin){
		if(!this.hasValue(value)){
			const T2 = i18n.createTranslator("errors");
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: T2("type.not-recognize"),
				  origin : origin,
				}
			}]);	
		}
		return value;
	}
};

export default function(obj){
	obj.properties = Object.assign({}, _.map(obj, (v, k) => ({ name: k.toLowerCase(), value: v })));
	obj = _.extend(obj, tools);
	return obj;
}