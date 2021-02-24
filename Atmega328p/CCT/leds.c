#define F_CPU 16000000UL
#define __AVR_ATmega328P__
#define UART_BAUD  9600
#include <ctype.h>
#include <stdint.h>
#include <stdio.h>
#include <Atmega328p/include/avr/iom328p.h>
#include <Atmega328p/include/util/delay.h>
#include <Atmega328p/include/avr/interrupt.h>
int main() {
    FILE uart_str = FDEV_SETUP_STREAM(uart_putchar, uart_getchar, _FDEV_SETUP_RW);
    uint8_t i;
    char buf[20], s[20];
    uart_init();

    stdout = stdin = &uart_str;
    while (1) {
        PORTD |= 0x20;
        _delay_ms(100);
        PORTD &= ~0x20;
        _delay_ms(100);
    }
}