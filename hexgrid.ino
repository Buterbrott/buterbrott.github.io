#include <FastLED.h>

#define DATA_PIN    3  
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB
#define NUM_LEDS 216

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);

  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS);
  FastLED.setBrightness(255);
  FastLED.clear();
  
}

uint8_t hue;

void loop() {
  for (byte i=0;i<NUM_LEDS;i++){
    leds[i].setHue(hue+i);
  }
  FastLED.show();
  hue++;
}

