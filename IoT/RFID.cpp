#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ESP8266HTTPClient.h>
const char* ssid = "Tec-IoT";
const char* password = "spotless.magnetic.bridge";
constexpr uint8_t RST_PIN = D3;
constexpr uint8_t SS_PIN = D4;

WiFiClientSecure wClient;
PubSubClient client(wClient);
HTTPClient httpClient;
const char* mqtt_server = "7b398e4b18b84e3bb15420f4f5fb7d91.s1.eu.hivemq.cloud";
const int mqtt_port = 8883; // Port for secure WebSocket
const char* mqtt_user = "admin";
const char* mqtt_password = "Admin123";
String URL = "https://rfidvideowall.azurewebsites.net/login/idCredencial";
MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

String tag;

void setup() {
  Serial.begin(9600);
  Serial.println("**Initializing connection to MQTT**");

  SPI.begin();
  rfid.PCD_Init();

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi \"");
  Serial.print(ssid);
  Serial.print("\"");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nConnected! IP: ");
  Serial.println(WiFi.localIP());
  delay(500);

  wClient.setInsecure(); // No se recomienda para produccion
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback); 
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop(); // Ensure client processes incoming messages

  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }
  if (rfid.PICC_ReadCardSerial()) {
    tag = "";
    for (byte i = 0; i < 4; i++) {
      tag += String(rfid.uid.uidByte[i]);
    }
    Serial.println(tag);
    logIntento(tag);
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ArduinoClient", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("Matricula");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}



void logIntento(String tag) {
  if (WiFi.status() == WL_CONNECTED) {
    String postData;
    postData = tag;
    Serial.print("Post Data String: ");
    Serial.println(postData);
    client.publish("Matricula",postData.c_str());
    
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Opcional
}
