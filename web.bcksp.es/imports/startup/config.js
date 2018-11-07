/*----------------------------------------*\
  web.bitRepublic - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:23:13
  @Last Modified time: 2018-11-07 12:56:31
\*----------------------------------------*/
export const config = {
	archives : {
		public : {
			type : 0,
			shortBuffer : {
				maxLen : 140
			},
			longBuffer : {
				maxLen : 1000
			}
		},
		private : {
			type : 1,
		}
	},
	methods : {
		rateLimit : {
			slow : {
				numRequests: 1,
				timeInterval: 60000,
			},
			fast : {
				numRequests: 1,
				timeInterval: 5000,
			},
			superFast : {
				numRequests: 5,
				timeInterval: 5000,
			}
		}
	},
	settings : {
		blindfield : {
			types : [{
				value : "email",
				placeholder : "demo@gmial.com"
			},{
				value : "password",
				placeholder : "password"
			},{
				value : "text",
				placeholder : "text"
			},{
				value : "search",
				placeholder : "search"
			},{
				value : "tel",
				placeholder : "+32495876315"
			},{
				value : "number",
				placeholder : 123
			},{
				value : "url",
				placeholder : "http://bcksp.es"
			}],
			class : []
		}
	}

}
