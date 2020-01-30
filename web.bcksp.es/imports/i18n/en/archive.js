/*----------------------------------------*\
  bcksp.es - archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:31:44
  @Last Modified time: 2020-01-30 12:23:00
\*----------------------------------------*/
i18n.addTranslation('en', "archive", {
	jauge : {
		tooltip : {
			default : "Your archive contains {$current} characters on {$target} available",
			custom : [
				"It's a begining for you!",
				"You are doing well, go for it!",
				"Your archive is over half!",
				"Your archive will soon be full!",
				"Here! Come to the boutique ..."
			]
		}
	},
	counter : "{$count} recorded characters",
	public : {
		tooltip : 	"<strong> 🔴 LIVE FEED 🔴 </strong><br/>\
					Live deletion assembly<br/>\
					from all the authors of bcksp.es<br/>\
					<small> nothing stays here long</small>",
		button : "public archive"
	},
	private : {
		tooltip : 	"<strong> 🔴 LIVE FEE 🔴 </strong><br/>\
					Your deleted text archive",
		button : "private archive"
	},
	fullscreen : {
		tooltip : "fullscreen",
		button : "fullscreen"
	},
	share : {
		button : "share"
	}
});
