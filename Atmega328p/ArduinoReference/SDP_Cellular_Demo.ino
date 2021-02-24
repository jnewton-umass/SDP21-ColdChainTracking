#include <stdio.h>
#include <math.h>
#include "Adafruit_FONA.h"
#include "Adafruit_Sensor.h"
#include <DS3231.h>
#include <Wire.h> // Used to establied serial communication on the I2C bus
#include <SparkFunTMP102.h> // Used to send and recieve specific information from our sensor


/***********************************
 * SIM7000 module globals/constants
 ***********************************/
#define SIMCOM_7000 // SIM7000A/C/E/G

// For SIM7000 shield
#define FONA_PWRKEY 6
#define FONA_RST 7
#define FONA_TX 10 // Microcontroller RX
#define FONA_RX 11 // Microcontroller TX

// this is a large buffer for replies
char replybuffer[255];

// We default to using software serial. If you want to use hardware serial
// (because softserial isnt supported) comment out the following three lines 
// and uncomment the HardwareSerial line
#include <SoftwareSerial.h>

SoftwareSerial fonaSS = SoftwareSerial(FONA_TX, FONA_RX);

// Use the following line for ESP8266 instead of the line above (comment out the one above)
//SoftwareSerial fonaSS = SoftwareSerial(FONA_TX, FONA_RX, false, 256); // TX, RX, inverted logic, buffer size

SoftwareSerial *fonaSerial = &fonaSS;

// Use this one for LTE CAT-M/NB-IoT modules (like SIM7000)
// Notice how we don't include the reset pin because it's reserved for emergencies on the LTE module!
#if defined(SIMCOM_7000) || defined(SIMCOM_7500)
  Adafruit_FONA_LTE fona = Adafruit_FONA_LTE();
#endif

uint8_t readline(char *buff, uint8_t maxbuff, uint16_t timeout = 0);
uint8_t type;
char imei[16] = {0}; // MUST use a 16 character buffer for IMEI!

/******************************
 * RTC Module Globals/constants
 *****************************/

DS3231 rtc(SDA,SCL);
Time t_current;
Time t_desired;
Time interval;

bool first = true;
int statusId = 0;

/******************************
 * TMP102 Module globals/constants
 *****************************/
TMP102 sensor0;
void setup() {
  /**************************
   * SIM7000
   **************************/
  // put your setup code here, to run once:
  pinMode(FONA_RST, OUTPUT);
  digitalWrite(FONA_RST, HIGH); // Default state

  pinMode(FONA_PWRKEY, OUTPUT);

  // Turn on the module by pulsing PWRKEY low for a little bit
  // This amount of time depends on the specific module that's used
  digitalWrite(FONA_PWRKEY, LOW);
  
  #if defined(SIMCOM_7000)
    delay(100); // For SIM7000
  #endif
  
  digitalWrite(FONA_PWRKEY, HIGH);


  Serial.begin(9600);
  Serial.println(F("FONA basic test"));
  Serial.println(F("Initializing....(May take several seconds)"));

  // Note: The SIM7000A baud rate seems to reset after being power cycled (SIMCom firmware thing)
  // SIM7000 takes about 3s to turn on but SIM7500 takes about 15s
  // Press reset button if the module is still turning on and the board doesn't find it.
  // When the module is on it should communicate right after pressing reset
  
  fonaSS.begin(115200); // Default SIM7000 shield baud rate

  Serial.println(F("Configuring to 9600 baud"));
  fonaSS.println("AT+IPR=9600"); // Set baud rate
  delay(100); // Short pause to let the command run
  fonaSS.begin(9600);
  if (! fona.begin(fonaSS)) {
    Serial.println(F("Couldn't find FONA"));
    while (1); // Don't proceed if it couldn't find the device
  }

  type = fona.type();
  Serial.println(F("FONA is OK"));
  Serial.print(F("Found "));
  switch (type) {
    case SIM7000A:
      Serial.println(F("SIM7000A (American)")); break;
    default:
      Serial.println(F("???")); break;
  }

  // Print module IMEI number.
  uint8_t imeiLen = fona.getIMEI(imei);
  if (imeiLen > 0) {
    Serial.print("Module IMEI: "); Serial.println(imei);
  }

  // Set modem to full functionality
  fona.setFunctionality(1); // AT+CFUN=1

  // Configure a GPRS APN, username, and password.
  // You might need to do this to access your network's GPRS/data
  // network.  Contact your provider for the exact APN, username,
  // and password values.  Username and password are optional and
  // can be removed, but APN is required.
  fona.setNetworkSettings(F("hologram")); // For Hologram SIM card

  if (!fona.enableGPS(true))
          Serial.println(F("Failed to turn GPS on"));
  else{
    Serial.println(F("Succeeded, GPS On"));
  }
  if (!fona.enableGPRS(false))
          Serial.println(F("Failed to turn off"));
          delay(10);
   if (!fona.enableGPRS(true)){
          Serial.println(F("Failed to turn cellular on"));
      }
   else{
        Serial.println(F("Succeeded, Cellular On"));
   }
/******************************
 * RTC Module Setup
 *****************************/
 rtc.begin();
 
 rtc.setDOW(5);
 
 rtc.setTime(4,30,0);
  
 rtc.setDate(13,11,2020);

 t_current = rtc.getTime();
 interval.sec=10;
 interval.min=0;
 interval.hour=0;
 t_desired = addHour(addMin(addSec(t_current,interval.sec),interval.min),interval.hour);
 
 Serial.println("desired seconds");
Serial.println(addMin(addSec(t_current,10),0).sec);
 
 
 /******************************
 * TMP102 Module Setup
 *****************************/
  
 Wire.begin(); //Join I2C Bus
   
  //pinMode(ALERT_PIN,INPUT);  
  
  /* The TMP102 uses the default settings with the address 0x48 using Wire.
  
     Optionally, if the address jumpers are modified, or using a different I2C bus,
  these parameters can be changed here. E.g. sensor0.begin(0x49,Wire1)
   
   It will return true on success or false on failure to communicate. */
  if(!sensor0.begin())
  {
    Serial.println("Cannot connect to TMP102.");
    Serial.println("Is the board connected? Is the device ID correct?");
    while(1);
  }
  
  Serial.println("Connected to TMP102!");
  delay(100);
  
  // set the sensor in Comparator Mode (0) or Interrupt Mode (1).
  //sensor0.setAlertMode(0); // Comparator Mode.
  
  // set the Conversion Rate (how quickly the sensor gets a new reading)
  //0-3: 0:0.25Hz, 1:1Hz, 2:4Hz, 3:8Hz
  sensor0.setConversionRate(0);
  
  //set Extended Mode.
  //0:12-bit Temperature(-55C to +128C) 1:13-bit Temperature(-55C to +150C)
  sensor0.setExtendedMode(0);

}

void loop() {
  /**************************
   * RTC
   **************************/
   t_current = rtc.getTime();
   //Serial.println(t_current.sec);
   //Serial.println(t_desired.sec);
   if(t_current.hour>=t_desired.hour&&t_current.min>=t_desired.min&&t_current.sec>=t_desired.sec){
      t_desired = addHour(addMin(addSec(t_current,interval.sec),interval.min),interval.hour);
      /*
t_diff = 60 - t_min_current + interval;
  if ((rtc.getTime().hour > 22) && (t_min_current + 1 > 59) && ((rtc.getTime().min == t_diff)) && (rtc.getTime().hour == 0)) {
    t_min_current = rtc.getTime().min;
    t_hour_current = rtc.getTime().hour;
    Serial.println(rtc.getDateStr());
    Serial.println(rtc.getTimeStr());
   // Serial.println(dht.readTemperature(true));

  }
  else if (rtc.getTime().min + rtc.getTime().hour * 60 - (t_min_current + t_hour_current * 60) == 1) {
    t_min_current = rtc.getTime().min;
    t_hour_current = rtc.getTime().hour;
    Serial.println(rtc.getDateStr());
    Serial.println(rtc.getTimeStr());
    */



/**************************
   * SIM7000
   **************************/

   
        float latitude, longitude, speed_kph, heading, altitude, second;
        latitude = 0.0;
        longitude = 0.0;
        uint16_t year;
        uint8_t month, day, hour, minute;
        if (fona.getGPS(&latitude, &longitude, &speed_kph, &heading, &altitude)) { // Use this line instead if you don't want UTC time
          /*
        Serial.println(F("---------------------"));
          Serial.print(F("Latitude: ")); Serial.println(latitude, 6);
          Serial.print(F("Longitude: ")); Serial.println(longitude, 6);
          Serial.print(F("Speed: ")); Serial.println(speed_kph);
          Serial.print(F("Heading: ")); Serial.println(heading);
          Serial.print(F("Altitude: ")); Serial.println(altitude);
          */
          // Comment out the stuff below if you don't care about UTC time
          /*
          Serial.print(F("Year: ")); Serial.println(year);
          Serial.print(F("Month: ")); Serial.println(month);
          Serial.print(F("Day: ")); Serial.println(day);
          Serial.print(F("Hour: ")); Serial.println(hour);
          Serial.print(F("Minute: ")); Serial.println(minute);
          Serial.print(F("Second: ")); Serial.println(second);
          Serial.println(F("---------------------"));
          */
        }
        /*
  // put your main code here, to run repeatedly:
  Wire.requestFrom(slaveAddress, 2);
  while (Wire.available()) { // slave may send less than requested
    temp = Wire.read(); // receive a byte as character
    Serial.print(temp);
  }
  delay(500);
  */
/******************************
 * TMP102 Module 
 *****************************/
  float temperature;
  
  
  // Turn sensor on to start temperature measurement.
  // Current consumtion typically ~10uA.
  sensor0.wakeup();

  // read temperature data
  temperature = sensor0.readTempF();
  //temperature = sensor0.readTempC();
  
  // Place sensor in sleep mode to save power.
  // Current consumtion typically <0.5uA.
  sensor0.sleep();

  // Print temperature and alarm state
  /*
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println();
  */

  char URL[80];
  char body[100];
  char endpointURL[50];
  
        if(first){
          sprintf(endpointURL,"status/register");
          first=false;
        } else {
          sprintf(endpointURL,"status/update");
        }
        sprintf(URL, "http://possible-point-294420.ue.r.appspot.com/%s",endpointURL);
        Serial.println(URL);
        sprintf(body, "{\"statusId\":\"MDR_Demo\", \"temperature\":25.0, \"light\":true, \"latitude\":0.0, \"longitude\":0.0}");//,statusId, String(temperature), String(longitude), String(latitude));
        Serial.println(body);
        //statusId+=1;
        if (!fona.postData("POST", URL, body)){// Can also add authorization token parameter!
          Serial.println(F("Failed to complete HTTP POST..."));
          first = true;
          //statusId-=1;
        }
        
        
  
  delay(100);
  }
  delay(100);
}

Time addSec(Time time1, int sec2){
  
  Time newTime=time1;
  
  
  if( time1.sec+sec2 >59){
    newTime.sec = time1.sec + sec2 - 60;
    return addMin(newTime,1);
  }
  else{
    newTime.sec = time1.sec + sec2;
    return newTime;
  }
}

Time addMin(Time time1, int min2){
  Time newTime=time1;
  
  if( time1.min+min2 >59){
    newTime.min = time1.min + min2 - 60;
    return addHour(newTime,1);
  }
  else{
    newTime.min= time1.min + min2;
    return newTime;
  }
}

Time addHour(Time time1, int hour2){
  Time newTime=time1;
  
  if( time1.hour+hour2 >23){
    newTime.hour = time1.hour + hour2 - 24;
    return addDay(newTime,1);
  }
  else{
    newTime.hour= time1.hour + hour2;
    return newTime;
  }
}

//BAD EDGECASE
Time addDay(Time time1, int day2){
  Time newTime;
  
  if( time1.hour+day2 >23){
    newTime.hour = time1.hour + day2 - 24;
    return addDay(newTime,1);
  }
  else{
    newTime.hour= time1.hour + day2;
    return newTime;
  }
}
