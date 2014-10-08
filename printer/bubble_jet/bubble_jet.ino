/*

	SHEET SIZE : 
	WIDTH 80 CHAR
	HEIGHT 70 CHAR


	Serial MESSAGE
	HEADER | POSITION-X | POSITION-Y | CHARACTERS-LENGTH | CHARACTERS | NEW-PAGE | FOOTER

	SOH    | 0-WIDTH	| 0-HEIGHT   | 0-WIDTH           | 32-254     | 0-1      | EOT

	PRINTABLE CHARACTERS
	0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
0 |   |SOH|   |   |EOT|ENQ|   |BEL| BS|   |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
1 | LF|   | FF| CR|   |   |   |   |   |   |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
2 |   |   |   |   |   |   |   |ESC|   |   |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
3 |   |   |' '| ! | " | # | $ | % | & | ' |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
4 | ( | ) | * | + | , | - | . | / | 0 | 1 |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
5 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | : | ; |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
6 | < | = | > | ? | à | A | B | C | D | E |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
7 | F | G | H | I | J | K | L | M | N | O |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
8 | P | Q | R | S | T | U | V | W | X | Y |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
9 | Z | ° | ç | § | ^ | _ | ` | a | b | c |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
10| d | e | f | g | h | i | j | k | l | m |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
11| n | o | p | q | r | s | t | u | v | w |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
12| x | y | z | é | ù | è | ¨ |   | Ç | ü |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
13| é | â | ä | à | å | ç | ê | ë | è | ï |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
14| î | ì | Ä | Â | É | æ | Æ | ô | ö | ò |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
15| û | ù | ÿ | Ö | Ü | € | £ | ¥ |   | ⨍ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
16| á | í | ó | ú | ñ | Ñ | ª | º | ¿ | ⌐ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
17| ¬ | ½ | ¼ | ¡ | « | » | ░ | ▒ | ▓ | | |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
18| ⊣ | ⫤ | ⫣ | ╖ | ╕ | ╣ | ǁ | ╗ | ╝ | ╜ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
19| ╛ | ┐ | └ | ┴ | ┬ | ├ | ─ | † | ╞ | ╟ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
20| ╚ | ╔ | ╩ | ╦ | ╠ | ═ | ╬ | ╧ | ╧ | ╤ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
21| ╥ | ╙ | ╘ | ╒ | ╓ | ╫ | ╪ | ┘ | ┌ | ▉ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
22| ▄ | ▌ | ▐ | ▀ | α | β | Γ | π | Σ | σ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
23| μ | τ | Φ | θ | Ω | δ | ∞ | Ø | ∈ | ⋂ |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
24| ≡ | ± | ≥ | ≤ | ⎧ | ⎭ | ÷ | ≈ | ° | • |
  +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+
25| · | √ | ⁿ | ² | ⬝ |
  +–––+–––+–––+–––+–––
*/

#define  SWIDTH			80	// Sheet Width  (char)
#define  SHEIGHT		70	// Sheet Height (char)

#define  SOH			1	// START OF HEADING : HEADER
#define  EOT			4	// END OF TRANSMISSION : FOOTER
#define  BEL			7	// RING THE BEL
#define  BS				8	// BACKSPACE
#define  LF				10	// NEW LINE
#define  FF				12	// NEW PAGE
#define  CR				13	// CARRIAGE RETURN
#define  ESC			27	// ESCAPE

// PRINTER 
  //COMMAND COMMAND
byte RESET			[] = {	// ESC + E
	ESC, 'E' };

byte RINGTHEBELL	[] = {	// BEL
	BEL };

byte NEWLINE		[] = {	// LF + CR 
	LF, CR };

byte PRINT			[] = {	// CR
	CR };

byte NEWPAGE		[] = {	// FF + CR
	FF, CR };

#define BUFFERMAXSIZE SWIDTH + 4

typedef struct BUFFER{
	byte current;
	byte cursor;
	byte buffer [BUFFERMAXSIZE]; // POSITION_X, POSITION_Y, CHARCTERS_LENGTH, CHARACTERS..., NEWPAGE
};

BUFFER buffer = {
	0, 0, 
	{ 
		0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	}
};

typedef struct CMD{
	byte positionX;
	byte positionY;
	byte length;
	byte characters [SWIDTH];
	boolean newPage;
};

CMD cmd = {
	0, 0, 0, 
	{
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	},
	false
};

byte old_position_y = 0;
boolean pageLoaded = false;

  // PARALLEL PORT TO ARDUINO PIN
#define  nStrobe		2
#define  data_0			3
#define  data_1			4
#define  data_2			5
#define  data_3			6
#define  data_4			7
#define  data_5			8
#define  data_6			9
#define  data_7			10
#define  nAck			11
#define  busy			12
#define  strobeWait 	2 // MICROSECONDS TO STROBE FOR
// STEPPER CONTROLLER
#include <Stepper.h>
#define  STEPS			48
#define  STEPPER_PIN_0	28
#define  STEPPER_PIN_1	26
#define  STEPPER_PIN_2	24
#define  STEPPER_PIN_3	22
#define  SETP_BY_LINE	62
#define  TIME_BY_LINE	100
#define  STEPPER_SPEED 	300
Stepper stepper(STEPS, STEPPER_PIN_0, STEPPER_PIN_1, STEPPER_PIN_2, STEPPER_PIN_3);


#define  PLAY 	0
#define  PAUSE 	1
boolean mode = PLAY;


void setup(){
	stepper.setSpeed(STEPPER_SPEED);

	Serial.begin(9600);
	while (!Serial) {
	; // wait for serial port to connect. Needed for Leonardo only
	}

	pinMode(nStrobe, OUTPUT);      // is active LOW
	digitalWrite(nStrobe, HIGH);   // set HIGH
	pinMode(data_0, OUTPUT);
	pinMode(data_1, OUTPUT);
	pinMode(data_2, OUTPUT);
	pinMode(data_3, OUTPUT);
	pinMode(data_4, OUTPUT);
	pinMode(data_5, OUTPUT);
	pinMode(data_6, OUTPUT);
	pinMode(data_7, OUTPUT);
	pinMode(nAck, INPUT);     // is active LOW
	pinMode(busy, INPUT);
	delay(1000);
}

void loop(){
	if(mode == PLAY && consumeUntilHeader())
	{
		readCommand();
		printCommand();
	}
}

boolean consumeUntilHeader()
{
	while(Serial.available())
	{
		byte v = Serial.read();
		if(SOH == v)
		{
			return true;
		}
	}
	return false;
}

void readCommand()
{
	while(true)
	{
		if(Serial.available())
		{
			buffer.current = Serial.read();
			if(buffer.current == EOT || buffer.cursor == BUFFERMAXSIZE)
			{
				buffer.cursor	= 0;
				cmd.positionX	= buffer.buffer[0];
				cmd.positionY	= buffer.buffer[1];
				cmd.length		= buffer.buffer[2];
				for(byte i = 0 ; i < cmd.length ; i++){
					cmd.characters[i] = buffer.buffer[3+i];
				}
				cmd.newPage	= buffer.buffer[4+cmd.length] == 1;
				break;
			}
			else
			{
				buffer.buffer[buffer.cursor++] = buffer.current;
			}
		}
	} 
}

void loadNewPage(){
	pageLoaded = true;
	printerFunction(RESET);
	printByte(' ');
	printerFunction(RESET);
	printerFunction(PRINT);
	delay(20);
	printerFunction(NEWLINE);
	delay(3000);
}

void printCommand(){
	if(!pageLoaded){
		loadNewPage();
	}
	moveToPositionY();
	moveToPositionX();
	for(int i = 0 ; i < cmd.length && cmd.positionX+i < SWIDTH ; i ++){
		printerFunction(RESET);
		printByte(cmd.characters[i]);
		printerFunction(RESET);
	}
	printerFunction(PRINT);
	printerFunction(RESET);
	delay(1000);
	if(cmd.newPage && false){
		printerFunction(RESET);
		printerFunction(NEWPAGE);
		printerFunction(RESET);
		pageLoaded = false;
		delay(3000);
	}
}

void moveToPositionX(){
	for(int i = 0 ; i < cmd.positionX ; i ++){
		printByte(' ');
	}
}

void moveToPositionY(){
	int move = old_position_y - cmd.positionY;
	stepper.step(SETP_BY_LINE * move);
	delay(TIME_BY_LINE * abs(move));
	digitalWrite(STEPPER_PIN_0, LOW);
	digitalWrite(STEPPER_PIN_1, LOW);
	digitalWrite(STEPPER_PIN_2, LOW);
	digitalWrite(STEPPER_PIN_3, LOW);
	delay(500);
	old_position_y = cmd.positionY;
	if(cmd.positionY>= SHEIGHT){
		pageLoaded = false;
		old_position_y = 0;
		loadNewPage();
	}
}

void printerFunction(byte CMD []){
	for(int i = 0 ; i < sizeof(CMD) ; i++){
		printByte(CMD[i]);
	}
}

void printByte(byte inByte) {
	while(digitalRead(busy) == HIGH);
	digitalWrite(data_0, bitRead(inByte, 0));
	digitalWrite(data_1, bitRead(inByte, 1));
	digitalWrite(data_2, bitRead(inByte, 2));
	digitalWrite(data_3, bitRead(inByte, 3));
	digitalWrite(data_4, bitRead(inByte, 4));
	digitalWrite(data_5, bitRead(inByte, 5));
	digitalWrite(data_6, bitRead(inByte, 6));
	digitalWrite(data_7, bitRead(inByte, 7));
	digitalWrite(nStrobe, LOW);       // strobe nStrobe to input data bits
	delayMicroseconds(strobeWait);
	digitalWrite(nStrobe, HIGH);
	while(digitalRead(busy) == HIGH);
}