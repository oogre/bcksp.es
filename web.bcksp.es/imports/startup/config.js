/*----------------------------------------*\
  web.bitRepublic - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:23:13
  @Last Modified time: 2019-03-08 19:28:21
\*----------------------------------------*/


export const config = {
	book : {
		page : {
			count : 100,
			line : {
				count : 32,
				char : {
					count : 32
				}
			}
		},
		getMaxChar : ()=>{
			return config.book.page.count * config.book.page.line.count * config.book.page.line.char.count;
		}
	},
	devices : {
		firefox : "jid1-P1oHEt4FsKJNoA@jetpack",
		firefoxUUID: "480bcc24-04ca-a942-a09b-cbdd2735fa88",
		"dev-chrome" : "ieiinhiiecccpepemfpeikdclbiicbmg",
		chrome : "gbfblhjcfcoodfjhmcaejjbppkajgleb"
	},
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
	user : {
		password : {
			length : {
				min : 6,
				max : 127
			}
		}
	},
	settings : {
		blindfield : {
			types : [{
				value : "email",
				placeholder : "demo@gmail.com"
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
				placeholder : "+32.495.876.315"
			},{
				value : "number",
				placeholder : 123
			},{
				value : "url",
				placeholder : "https://bcksp.es"
			}],
			class : []
		}
	}

}
