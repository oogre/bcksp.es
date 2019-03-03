/*----------------------------------------*\
  bcksp.es - math.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-12 20:31:50
  @Last Modified time: 2019-02-12 20:34:39
\*----------------------------------------*/

export function lerp(a, b, t) {
	return a + Math.max(0, Math.min(1, t)) * (b - a);
}