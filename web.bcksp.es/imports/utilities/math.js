/*----------------------------------------*\
  bcksp.es - math.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-12 20:31:50
  @Last Modified time: 2019-11-13 17:52:48
\*----------------------------------------*/

export function lerp(a, b, t) {
	return a + Math.max(0, Math.min(1, t)) * (b - a);
}

export function random(min, max) {
	return lerp(min, max, Math.random());
}

export function randomCeil(min, max) {
	return Math.ceil(random(min, max));
}

export function randomAround(target, dist) {
	return random(target - Math.abs(dist), target + Math.abs(dist));
}

export function nf(number) {
	return i18n.parseNumber(number).replace(" ", ".");
}