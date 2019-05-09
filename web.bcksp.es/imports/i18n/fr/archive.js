/*----------------------------------------*\
  bcksp.es - archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:31:44
  @Last Modified time: 2019-05-05 16:28:55
\*----------------------------------------*/
i18n.addTranslation('fr', {
	archive : {
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
			tooltip : "<strong>En direct</strong><br/>Suppressions aggrégées des auteurs de bcksp.es.",
			button : "archive publique"
		},
		private : {
			tooltip : "<strong>En direct</strong><br/>Votre archive de texte supprimé",
			button : "archive privée"
		},
		fullscreen : {
			button : "plein écran"
		},
		share : {
			button : "partager"
		}
	}
});
