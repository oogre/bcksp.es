/*----------------------------------------*\
  bcksp.es - signature.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-28 00:04:43
  @Last Modified time: 2020-01-28 22:56:57
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - posterConfirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 23:40:25
  @Last Modified time: 2019-02-28 00:00:29
\*----------------------------------------*/
import React from 'react';
import { Box, Item, Span, A, Image } from 'react-html-email';

const SignatureMailTemplate = () => {

	const textDefaults = {
		fontFamily: 'monospace',
		fontSize: 15,
		color: 'black'
	};
	const textBold = {
		fontFamily: 'monospace',
		fontWeight: 'bold',
		fontSize: 15,
		color: 'black'
	};

	return (
		<Box width="100%">
			<Item>
				<Span {...textDefaults}>
					<Span {...textBold}>BCKSP.ES</Span> - WE ARCHIVE ERASED TEXT
				</Span>
			</Item>
			<Item>
				<Span {...textDefaults}>
					&nbsp;WE USE TO DO SO FOR ART PURPOSE&nbsp;
				</Span>
			</Item>
			<Item>
				<Span {...textDefaults}>
					VISIT OUR PAGE > <A download="https://bcksp.es" href="https://bcksp.es">HTTPS://BCKSP.ES</A>
				</Span>
			</Item>
			<Item>
				<Span {...textDefaults}>
					BRUSSSELS'S BASED STUDIO VISIT US
				</Span>
			</Item>
		</Box>
	);
}
export default SignatureMailTemplate;