/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var printable_characters = [
" ", 
"!","\"", "#", "$", "%", "&", "'", "(", ")", "*",
"+", ",", "-", ".", "/", "0", "1", "2", "3", "4",
"5", "6", "7", "8", "9", ":", ";", "<", "=", ">", 
"?", "à", "A", "B", "C", "D", "E", "F", "G", "H", 
"I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
"S", "T", "U", "V", "W", "X", "Y", "Z", "°", "ç", 
"§", "^", "_", "`", "a", "b", "c", "d", "e", "f",
"g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
"q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
"é", "ù", "è", "¨", "",  "Ç", "ü", "é", "â", "ä", 
"à", "å", "ç", "ê", "ë", "è", "ï", "î", "ì", "Ä", 
"Â", "É", "æ", "Æ", "ô", "ö", "ò", "û", "ù", "ÿ", 
"Ö", "Ü", "€", "£", "¥", "" , "⨍", "á", "í", "ó",
"ú", "ñ", "Ñ", "ª", "º", "¿", "⌐", "¬", "½", "¼",
"¡", "«", "»", "░", "▒", "▓", "|", "⊣", "⫤", "⫣", 
"╖", "╕", "╣", "ǁ", "╗", "╝", "╜", "╛", "┐", "└",
"┴", "┬", "├", "─", "†", "╞", "╟", "╚", "╔", "╩", 
"╦", "╠", "═", "╬", "╧", "╧", "╤", "╥", "╙", "╘",
"╒", "╓", "╫", "╪", "┘", "┌", "▉", "▄", "▌", "▐",
"▀", "α", "β", "Γ", "π", "Σ", "σ", "μ", "τ", "Φ",
"θ", "Ω", "δ", "∞", "Ø", "∈", "⋂", "≡", "±", "≥",
"≤", "⎧", "⎭", "÷", "≈", "°", "•", "·", "√", "ⁿ",
"²", "⬝"
];

var recurence = 5;
var counter = 0;
var sentence = [	"bcksp.es imprime ce que vous supprimez", 
					"suivez bckspes sur twitter", 
					"likez bcksp.es sur facebook", 
					"archivez vos mots supprimés sur http://www.bcksp.es",
					"entre poésie et bruit",
					"bcksp.es c'est de la pensé perdue",
				];

var converter = function(char){
	var index = printable_characters.indexOf(char);
	if(index>=0){
		return 32+index;
	}
	else{
		return 32;
	}
};
var width = 70;
var height = 60;
var charcounter = 10;
var linecounter = 0;
var angle = 2 * Math.PI / 10;
var getPosition = function(length){
	var x = Math.floor(charcounter);
	var y = Math.floor(linecounter);
	charcounter+= length + (Math.random() * length);
	if(charcounter >= width){
		charcounter = 10;
		linecounter ++;
	}
	if(linecounter >= height){
		charcounter = 0;
	}
	return [x, y];
}

var messageToByteArray = function(message){
	message = message.split("").map(function(char){
		if(char == "\n"){
			return 32;
		}
		else if(char == "\b"){
			return 8;
		}
		else{
			return converter(char);
		}
	});
	counter++;
	if(counter%recurence == 0 ){
		setTimeout(function(){
			commandArduino(messageToByteArray(sentence[Math.floor(Math.random()*sentence.length)]));
		}, 3000);
	}
	var head = ([1]).concat(getPosition(message.length)).concat(message.length);
	var footer = [0, 4];
	return head.concat(message).concat(footer);
};

var commandArduino = function(message){
		console.log(message);
		try{
			var SerialPort = require("serialport").SerialPort;
			var serialport = new SerialPort(sails.config.arduino.adress); // replace this address with your port address
			serialport.on('open', function(){
					// Now server is connected to Arduino
					console.log('Serial Port Opend');

					serialport.on('data', function(data) {
					//console.log('data received: ' + data);
					});
					
					serialport.write(message, function(err, results) {
						if(err)console.log(err);
					console.log("OK");
					});
				});
  		}catch(e){
  			console.log("KO");
  		}
}

module.exports = {
	"new" : function(req, res, next){
		var message = req.param("message");
		console.log(message);
		commandArduino(messageToByteArray(message));
		return res.json({
			status : "OK"
		});
	},
	"printAll" : function(req, res, next){
		res.view();
	}
};

