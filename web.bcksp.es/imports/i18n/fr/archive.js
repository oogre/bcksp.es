/*----------------------------------------*\
  bcksp.es - archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:31:44
  @Last Modified time: 2020-01-26 21:13:22
\*----------------------------------------*/
i18n.addTranslation('fr', "archive", {
	jauge : {
		tooltip : {
			default : "Ton archive contient {$current} caractères sur {$target} caractères disponibles",
			custom : [
				"C'est le début pour toi!",
				"Tu avances bien, constitue!",
				"Ton archive à dépassé la moitié!",
				"Ton archive sera bientôt pleine!",
				"Voilà! Rendez-vous à la boutique..."
			]
		}
	},
	counter : "{$count} charactèrs enregistré",
	public : {
		tooltip : 	"<strong> 🔴 FLUX DIRECT 🔴 </strong><br/>\
					Assemblage en direct des suppressions<br/>\
					de tous les auteurs de bcksp.es<br/>\
					<small>rien ne reste bien longtemps ici</small>",
		button : "archive publique"
	},
	private : {
		tooltip : 	"<strong> 🔴 FLUX DIRECT 🔴 </strong><br/>\
					Votre archive de texte supprimé",
		button : "archive privée"
	},
	fullscreen : {
		tooltip : "plein écran",
		button : "plein écran"
	},
	share : {
		button : "partager"
	}
});
