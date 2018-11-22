/*----------------------------------------*\
  web.bitRepublic - sStreamer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 14:46:56
  @Last Modified time: 2018-11-22 21:04:13
\*----------------------------------------*/
// https://github.com/RocketChat/meteor-streamer
export const streamer = new Meteor.Streamer('live', {retransmit : false});


if (Meteor.isServer) {
  	streamer.allowRead('publicBackspaces', 'all');
}