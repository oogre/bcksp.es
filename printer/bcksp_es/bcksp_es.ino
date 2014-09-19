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

// PUBLISHING SETTING
#define  MCPL       29       // Maximum Characters Per Line
#define  MLPP       28       // Maximum Line Per Page
#define  FOLIOMT    2
#define  MR         5        // Margin Right
#define  MT         1        // Margin Top
#define  MB         3        // Margin Bottom
int      ML       = 5; // 46 // Margin Left
int      CPLCnt   = 0;       // Character Per Line Counter
int      LCnt     = 0;       // Line Counter
int      FOLIOCnt = 1; 
String   FOLIO    = "prout";
int      FOLIOML  = 2;

// ASCII CONVERTER
#define  SOH        1
#define  ACK        6
#define  BEL        7
#define  BS         8
#define  LF         10
#define  FF         12
#define  CR         13
#define  ESC        27
#define  QUOTE      34
#define  CIRCUM     94
#define  GRAVE      96
#define  ACUTE      39

// EASY COMMAND
byte RESET       [] = { 
  ESC, 'E' };

byte RINGTHEBELL [] = { 
  BEL };

byte NEWLINE     [] = { 
  LF, CR };

byte PRINT     [] = { 
  CR };

byte NEWPAGE     [] = { 
  FF, CR };

byte ACUTEACCENT [] = { 
  BS, ACUTE };

byte UMLAUTACCENT [] = { 
  BS, QUOTE };

byte GRAVEACCENT [] = { 
  BS, GRAVE };

byte CIRCUMACCENT[] = { 
  BS, CIRCUM };

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
// MICROSECONDS TO STROBE FOR
#define  strobeWait 2

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
  CMD(RESET);
  CMD(RINGTHEBELL);
}

void loop() {
  if(Serial.available()){
    byte message  = Serial.read();
    if(message < 129){
      CMD(RESET);
      int result = printMessage(message);
      CMD(RESET);
      switch(result){
      case 0:
        break;
      case 1:
        CMD(NEWLINE);
        LCnt ++;
        delay(10);
        CPLCnt = 0;
        Serial.println("");
        break;
      case 2:
        CMD(RESET);
        printFolio(String(FOLIOCnt++));
        CMD(RESET);
        if(ML == 5){
          CMD(NEWLINE);
          LCnt ++;
          delay(1000);
          backline();
          ML = (ML + MCPL + MR) + ML;
          FOLIOML = (ML + MCPL + MR) + (ML + MCPL + MR) - FOLIOML;
          LCnt = 0;
          CPLCnt = 0;
        }
        else{
          CMD(RESET);
          CMD(NEWPAGE);
          CMD(RESET);
          ML = 5;
          FOLIOML = 2;
          LCnt = 0;
          CPLCnt = 0;
        }
        break;
      }
    }
  }
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

// return 
// '0' => Nothing
// '1' => End Line
// '2' => End Page
int printMessage(byte message) {
  // MARGIN TOP
  while(LCnt < MT){
    CMD(NEWLINE);
    LCnt ++;
    Serial.println('*');
  }
  // MARGIN LEFT
  while(CPLCnt < ML){
    printByte(' ');
    CPLCnt ++;
    Serial.print('.');
  }
  if( message != LF){
    printByte(message);
    CPLCnt ++;
    Serial.print(char(message));
  }

  // if line complete || if End Line
  if(CPLCnt >= MCPL+ML || message == LF){
    // if page complete
    if(LCnt >= MLPP+MT){
      return 2;
    }
    return 1;
  }
  return 0;
}

void printFolio(String folio) {
  for(int i = 0 ; i < FOLIOMT ; i ++){
    CMD(NEWLINE);
    LCnt ++;
    Serial.println('*');
  }
  // MARGIN LEFT
  for(int i = 0 ; i < FOLIOML ; i ++){
    printByte(' ');
    Serial.print('.');
  }
  for(int i = 0 ; i < folio.length() ; i++){
    printByte(folio[i]);
    Serial.print(char(folio[i]));
  }
      Serial.println("");
  CMD(NEWLINE);
  LCnt ++;
}

void busyLowDuring(int maxWait, int bump){
   long initbump = millis();
   long init = millis();
   while(millis()-init<maxWait){
     
     Serial.println(millis()-init);
     if(millis()-initbump>bump){
       break;
     }
     if(digitalRead(busy) == HIGH){
       Serial.println("!");
       init = millis();
     }
   }
} 
  
   
void backline(){
  busyLowDuring(3000, 20000);
  stepper.step(SETP_BY_LINE * (LCnt - 1) );
  delay(5000);
  Serial.println("LOW");
  digitalWrite(STEPPER_PIN_0, LOW);
  digitalWrite(STEPPER_PIN_1, LOW);
  digitalWrite(STEPPER_PIN_2, LOW);
  digitalWrite(STEPPER_PIN_3, LOW);
}






