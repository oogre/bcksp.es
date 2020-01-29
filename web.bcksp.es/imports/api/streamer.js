/*----------------------------------------*\
  web.bitRepublic - sStreamer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 14:46:56
  @Last Modified time: 2020-01-13 00:08:55
\*----------------------------------------*/
// https://github.com/RocketChat/meteor-streamer
export const streamer = new Meteor.Streamer('live', {retransmit : false});

if (Meteor.isServer) {
  	streamer.allowRead('publicBackspaces', 'all');
}