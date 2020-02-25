/*----------------------------------------*\
  bcksp.es - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:23:13
  @Last Modified time: 2020-02-25 22:21:29
\*----------------------------------------*/
export const config = {
	souvenir : {
		almanach : false,
		poster : {
			price : {
				amount : 15
			}
		},
		book : {
			basic : {
				price : {
					amount : 20
				}
			},
			premium : {
				price : {
					amount : 80
				}
			}
		}
	},
	book : {
		page : {
			count : 128,
			line : {
				count : 32,
				char : {
					count : 32
				},
			},
			getMaxChar : ()=>{
				return config.book.page.line.count * config.book.page.line.char.count;
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
		"acr-chrome" : "fnkkmpbdnhbapbmbcpdfenolnbkbplob",
		chrome : "gbfblhjcfcoodfjhmcaejjbppkajgleb",
		pingInterval : 10 * 60 * 1000
	},
	archives : {
		public : {
			shortBuffer : {
				maxLen : 140
			},
			longBuffer : {
				maxLen : 1000,
				maxMaxLen : 2000
			}
		}
	},
	methods : {
		rateLimit : {
			low : {
				numRequests: 1,
				timeInterval: 10000,
			},
			mid : {
				numRequests: 2,
				timeInterval: 5000,
			},
			high : {
				numRequests: 3,
				timeInterval: 1000,
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
			available : {
				types : [{
					value : "email",
					placeholder : "demo@gmail.com"
				},{
					value : "password",
					placeholder : "••••••••••"
				},{
					value : "text",
					placeholder : "bonjour"
				},{
					value : "search",
					placeholder : "image chatton érotique"
				},{
					value : "tel",
					placeholder : "+32.495.876.315"
				},{
					value : "number",
					placeholder : 123
				},{
					value : "url",
					placeholder : "https://bcksp.es"
				}]
			},
			disabled : {
				default : {
					class : ["bcksp-es-disabled"],
					type : ["password"]
				},
				blocked : {
					class : ["bcksp-es-disabled"],
					type : []
				}
			}
		}
	}
};