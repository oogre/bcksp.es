// PUBLISHING SETTING
#define  SWIDTH     80          // Sheet Width  (char)
#define  SHEIGHT    70          // Sheet Height (char)
#define  PWIDTH     SWIDTH/2    // Page Width   (char)
#define  PHEIGHT    SHEIGHT/2   // Page Height  (char)

String   HEAD  [] =    {"bcksp.es", "septembre 2014"};
int      HMARGIN[]=    { 0 , 0 } ;     // ABSOLUTE Head Margin TOP LEFT
int      FMARGIN[]=    { 1 , 3 };      // ABSOLUTE Folio Margin TOP LEFT
#define  TWIDTH     30                 // Text Width
#define  THEIGHT    27                 // Text Height
int      TMARGIN[]=    { 2 , 5 } ;     // ABSOLUTE Text Margin TOP LEFT 

int      folioCounter     = 1;
int      currentPage      = 0;    // Per Book
int      lineCounter      = 0;    // Per Page
int      charCounter      = 0;    // Per Line
int      currentMargin [] = { 0, 0 };

// PRINTER 
  //COMMAND COMMAND
byte RESET       [] = { 
  27, 'E' };           // ESC + E

byte RINGTHEBELL [] = { 
  7 };                 // BEL

byte NEWLINE     [] = { 
  10, 13 };            // LF + CR

byte NEWPAGE     [] = { 
  12, 13 };            // FF + CR

  // PARALLEL PORT TO ARDUINO PIN
#define  nStrobe    2
#define  data_0     3
#define  data_1     4
#define  data_2     5
#define  data_3     6
#define  data_4     7
#define  data_5     8
#define  data_6     9
#define  data_7     10
#define  nAck       11
#define  busy       12
#define  strobeWait 2 // MICROSECONDS TO STROBE FOR


// STEPPER CONTROLLER
#include <Stepper.h>
#define  STEPS                     48
#define  STEPPER_PIN_0             28
#define  STEPPER_PIN_1             26
#define  STEPPER_PIN_2             24
#define  STEPPER_PIN_3             22
#define  SETP_BY_LINE              62
#define  STEPPER_SPEED             300
Stepper stepper(STEPS, STEPPER_PIN_0, STEPPER_PIN_1, STEPPER_PIN_2, STEPPER_PIN_3);


typedef struct PAGE{
  boolean recto;       // true : RECTO  false : VERSO
  boolean top;         // true : TOP  false : bottom
  boolean left;        // true : LEFT  false : right
  String head;
  int headMargin [2];
  int textMargin [2];
  int folioMargin [2];
};

PAGE rectoTopLeft = {
  true,
  true,
  true,
  HEAD[0],
  { HMARGIN[0], HMARGIN[1] + PWIDTH/2 - HEAD[0].length() / 2 },
  { TMARGIN[0], TMARGIN[1] },
  { FMARGIN[0], FMARGIN[1] }
};

PAGE rectoTopRight = {
  true,
  true,
  false,
  HEAD[1],
  { HMARGIN[0], PWIDTH + HMARGIN[1] + PWIDTH/2 - HEAD[1].length() / 2 },
  { TMARGIN[0], PWIDTH + TMARGIN[1] },
  { FMARGIN[0], SWIDTH - FMARGIN[1]}
};

PAGE rectoBottomLeft = {
  true,
  false,
  true,
  HEAD[0],
  { HMARGIN[0], HMARGIN[1] + PWIDTH/2 - HEAD[0].length() / 2 },
  { TMARGIN[0], TMARGIN[1] },
  { FMARGIN[0], FMARGIN[1] }
};

PAGE rectoBottomRight = {
  true,
  false,
  false,
  HEAD[1],
  { HMARGIN[0], PWIDTH + HMARGIN[1] + PWIDTH/2 - HEAD[1].length() / 2 },
  { TMARGIN[0], PWIDTH + TMARGIN[1] },
  { FMARGIN[0], SWIDTH - FMARGIN[1]}
};

PAGE versoTopLeft = {
  false,
  true,
  true,
  HEAD[0],
  { HMARGIN[0], HMARGIN[1] + PWIDTH/2 - HEAD[0].length() / 2 },
  { TMARGIN[0], TMARGIN[1] },
  { FMARGIN[0], FMARGIN[1] }
};

PAGE versoTopRight = {
  false,
  true,
  false,
  HEAD[1],
  { HMARGIN[0], PWIDTH + HMARGIN[1] + PWIDTH/2 - HEAD[1].length() / 2 },
  { TMARGIN[0], PWIDTH + TMARGIN[1] },
  { FMARGIN[0], SWIDTH - FMARGIN[1]}
};

PAGE versoBottomLeft = {
  false,
  false,
  true,
  HEAD[0],
  { HMARGIN[0], HMARGIN[1] + PWIDTH/2 - HEAD[0].length() / 2 },
  { TMARGIN[0], TMARGIN[1] },
  { FMARGIN[0], FMARGIN[1] }
};

PAGE versoBottomRight = {
  false,
  false,
  false,
  HEAD[1],
  { HMARGIN[0], PWIDTH + HMARGIN[1] + PWIDTH/2 - HEAD[1].length() / 2 },
  { TMARGIN[0], PWIDTH + TMARGIN[1] },
  { FMARGIN[0], SWIDTH - FMARGIN[1]}
};


#define PAGETYPELENGTH 8
typedef struct PRINT{
  PAGE pages [PAGETYPELENGTH];
};

PRINT print = {
  { rectoTopRight, versoTopLeft, versoTopRight, rectoTopLeft, 
    rectoBottomRight, versoBottomLeft, versoBottomRight, rectoBottomLeft
  }
};

// FORK Version : https://github.com/oogre/StackArray/archive/master.zip
#include <StackArray.h>
StackArray <byte> buffer;

void setup() {
  // STEPPER INIT
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
  printHead();
}

void loop() {
  if(Serial.available() && 4096>buffer.count()){
    buffer.unshift(Serial.read());
  }
  if(buffer.count() >= TWIDTH){
    printText();
    
    if(lineCounter >= THEIGHT + print.pages[currentPage].textMargin[0]){
      delay(1000);
      int nextPage = (currentPage+1) % PAGETYPELENGTH;

      if( print.pages[currentPage].recto != print.pages[nextPage].recto){
        newPage();
        if(!print.pages[nextPage].top){
          largeTopToBottom();
        }
      }
      else if( print.pages[currentPage].top && !print.pages[nextPage].top ){
        delay(5000);
        smallTopToBottom();
      }
      else if( !print.pages[currentPage].top && print.pages[nextPage].top ){
        newPage();
      }
      else if(print.pages[currentPage].left && !print.pages[nextPage].left){
        delay(5000);
        rewind();
      }
      currentPage = nextPage;
      charCounter = 0;
      lineCounter = 0;
      printHead();
    }
  }
}

void newPage(){
  CMD(RESET);
  CMD(RINGTHEBELL);
  CMD(RESET);
  CMD(NEWPAGE);
  CMD(RESET);
  delay(15000);
}

void largeTopToBottom(){
  String message = ".";
  setCursorPosition(1, 3);
  for(int i = 0 ; i < message.length() ; i ++){
    printMessage(message[i]);
  }
  CMD(NEWLINE);
  Serial.println("");
  delay(10000);
  stepper.step( -1 * SETP_BY_LINE * (PHEIGHT-2) );
  resetSetpper();
}
void smallTopToBottom(){
  stepper.step( -1 * SETP_BY_LINE * 6 );
  resetSetpper();
}

void rewind(){
  stepper.step(SETP_BY_LINE * (lineCounter - 1) );
  resetSetpper();
}

void resetSetpper(){
  delay(5000);
  digitalWrite(STEPPER_PIN_0, LOW);
  digitalWrite(STEPPER_PIN_1, LOW);
  digitalWrite(STEPPER_PIN_2, LOW);
  digitalWrite(STEPPER_PIN_3, LOW);
  delay(500);
  digitalWrite(STEPPER_PIN_0, LOW);
  digitalWrite(STEPPER_PIN_1, LOW);
  digitalWrite(STEPPER_PIN_2, LOW);
  digitalWrite(STEPPER_PIN_3, LOW);
  delay(500);
}

void printHead(){
  setCursorPosition(print.pages[currentPage].headMargin[0], print.pages[currentPage].headMargin[1]);
  for(int i = 0 ; i < print.pages[currentPage].head.length() ; i ++){
    printMessage(print.pages[currentPage].head[i]);
  }
  CMD(NEWLINE);
  Serial.println("");
  delay(500);
  lineCounter++;
  charCounter = 0;
  printFolio();
}

void printFolio(){
  String folio = String(folioCounter++);

  int marginLeft = print.pages[currentPage].folioMargin[1];

  if(!print.pages[currentPage].left){
    marginLeft-=folio.length();
  }
  else{
    marginLeft = marginLeft;
  }

  setCursorPosition(print.pages[currentPage].folioMargin[0], marginLeft);
   for(int i = 0 ; i < folio.length() ; i ++){
    printMessage(folio[i]);
  }
  CMD(NEWLINE);
  Serial.println("");
  delay(500);
  lineCounter++;
  charCounter = 0;
}

void printText(){
  setCursorPosition(print.pages[currentPage].textMargin[0], print.pages[currentPage].textMargin[1]);
  for(int i = 0 ; i < TWIDTH ; i ++){
    if(printMessage(buffer.pop())){
      break;
    }
  }
  if(charCounter >= TWIDTH + print.pages[currentPage].textMargin[1]){
    CMD(NEWLINE);
    lineCounter++;
    charCounter = 0;
    Serial.println("");
  }
}

void setCursorPosition(int x, int y){
  while(lineCounter < x){
    for(int c = 0 ; c < PWIDTH ; c++){
      Serial.print('.');
    }
    CMD(NEWLINE);
    lineCounter ++;
    Serial.println("");
    delay(500);
  }
  // MARGIN LEFT
  while(charCounter < y){
    charCounter++;
    printByte(' ');
    Serial.print('.');
  }
}

boolean printMessage(byte message) {
  CMD(RESET);
  if(message == 10){
    CMD(NEWLINE);
    lineCounter ++;
    charCounter = 0;
    Serial.println("");
  }else{
    printByte(message);
    Serial.print(getChar(message));
    charCounter ++;
  }
  CMD(RESET);
  return message == 10;
}


void CMD(byte CMD []){
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

String simpleQuote = "'";
char characters [] = {
  ' ', 
  '!', '"', '#', '$', '%', '&', simpleQuote.charAt(0), '(', ')', '*',
  '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', 
  '?', 'à', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '°', 'ç', 
  '§', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
  'é', 'ù', 'è', '¨', ' ',  'Ç', 'ü', 'é', 'â', 'ä', 
  'à', 'å', 'ç', 'ê', 'ë', 'è', 'ï', 'î', 'ì', 'Ä', 
  'Â', 'É', 'æ', 'Æ', 'ô', 'ö', 'ò', 'û', 'ù', 'ÿ', 
  'Ö', 'Ü', '€', '£', '¥', ' ' , '⨍', 'á', 'í', 'ó',
  'ú', 'ñ', 'Ñ', 'ª', 'º', '¿', '⌐', '¬', '½', '¼',
  '¡', '«', '»', '░', '▒', '▓', '|', '⊣', '⫤', '⫣', 
  '╖', '╕', '╣', 'ǁ', '╗', '╝', '╜', '╛', '┐', '└',
  '┴', '┬', '├', '─', '†', '╞', '╟', '╚', '╔', '╩', 
  '╦', '╠', '═', '╬', '╧', '╧', '╤', '╥', '╙', '╘',
  '╒', '╓', '╫', '╪', '┘', '┌', '▉', '▄', '▌', '▐',
  '▀', 'α', 'β', 'Γ', 'π', 'Σ', 'σ', 'μ', 'τ', 'Φ',
  'θ', 'Ω', 'δ', '∞', 'Ø', '∈', '⋂', '≡', '±', '≥',
  '≤', '⎧', '⎭', '÷', '≈', '°', '•', '·', '√', 'ⁿ',
  '²', '⬝'
};

char getChar(byte b){
  if(b<=200){
    return characters[b-32];
  }  
  else{
    return ' ';
  }
}