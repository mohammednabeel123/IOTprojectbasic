const int ledPin = 13; // Pin 13 where the LED is connected

void setup() {
  pinMode(ledPin, OUTPUT); // Set LED pin as output
  Serial.begin(9600); // Start serial communication
}

void loop() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n'); // Read the command from serial
    command.trim(); // Remove any extra spaces from the command

    if (command == "ON") {
      digitalWrite(ledPin, HIGH); // Turn the LED on
      Serial.println("LED is ON");
    } else if (command == "OFF") {
      digitalWrite(ledPin, LOW); // Turn the LED off
      Serial.println("LED is OFF");
    }
  }
}
