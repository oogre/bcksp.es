/*----------------------------------------*\
  bcksp.es - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:23:13
  @Last Modified time: 2021-03-08 12:58:30
\*----------------------------------------*/
export const config = {
	langues : [
		"af","am","ar","arn","as","az","ba","be","bg","bn",
		"bo","br","bs","ca","co","cs","cy","da","de","dsb",
		"dv","el","en","es","et","eu","fa","fi","fil","fo",
		"fr","fy","ga","gd","gl","gsw","gu","ha","he","hi",
		"hr","hsb","hu","hy","id","ig","ii","is","it","iu",
		"ja","ka","kk","kl","km","kn","ko","kok","ky","lb",
		"lo","lt","lv","mi","mk","ml","mn","moh","mr","ms",
		"mt","nb","ne","nl","nn","no","oc","or","pa","pl",
		"prs","ps","pt","qut","quz","rm","ro","ru","rw","sa",
		"sah","se","si","sk","sl","sma","smj","smn","sms","sq",
		"sr","sv","sw","syr","ta","te","tg","th","tk","tn","tr",
		"tt","tzm","ug","uk","ur","uz","vi","wo","xh","yo","zh","zu"
	],
	souvenir : {
		almanach : {
			visible : false
		},
		poster : {
			visible : true,
			price : {
				amount : 15
			}
		},
		book : {
			visible : true,
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
		keys :{
			firefox : "jid1-P1oHEt4FsKJNoA@jetpack",
			firefoxUUID: "480bcc24-04ca-a942-a09b-cbdd2735fa88",
			"dev-chrome" : "ieiinhiiecccpepemfpeikdclbiicbmg",
			"acr-chrome" : "fnkkmpbdnhbapbmbcpdfenolnbkbplob",
			chrome : "gbfblhjcfcoodfjhmcaejjbppkajgleb",
		}, 
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