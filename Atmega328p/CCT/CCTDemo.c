#define __AVR_ATmega328P__
#include <ctype.h>
#include <stdint.h>
#include <Atmega328p/include/stdio.h>
#include <Atmega328p/include/util/delay.h>
#include <Atmega328p/include/avr/interrupt.h>
#include <Atmega328p/include/util/twi.h>
#include <math.h>
#include <Atmega328p/include/Adafruit_FONA.h>
#include <Atmega328p/include/Adafruit_Sensor.h>
#include <Atmega328p/include/DS3231.h>
#include <Atmega328p/include/SparkFunTMP102.h> // Used to send and recieve specific information from our sensor
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
int main() {
    uint8_t i;
    char buf[20], s[20];
    uart_init();
    while (1) {
        PORTD |= 0x20;
        _delay_ms(100);
        PORTD &= ~0x20;
        _delay_ms(100);
    }
}