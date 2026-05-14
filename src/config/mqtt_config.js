import mqtt from "mqtt";
import { config } from "./config.js";
import { Log } from "../libs/logger/logger.js";

export const mqttClient = mqtt.connect(config.mqttUrl, {
  clientId: config.mqttClientId,
  username: config.mqttUsername,
  password: config.mqttPassword,
  rejectUnauthorized: false,
});

mqttClient.on("reconnect", () => {
  Log.warn("MQTT reconnecting...");
});

mqttClient.on("close", () => {
  Log.warn("MQTT connection closed");
});

mqttClient.on("offline", () => {
  Log.warn("MQTT offline");
});

mqttClient.on("end", () => {
  Log.warn("MQTT ended");
});
