import mqtt from "mqtt";
import { config } from "./config.js";
import { Log } from "../libs/logger/logger.js";

export const mqttClient = mqtt.connect(config.mqttUrl, {
  clientId: config.mqttClientId,
  username: config.mqttUsername,
  password: config.mqttPassword,
  rejectUnauthorized: false,
});

mqttClient.on("connect", () => {
  Log.info("MQTT connected");
});

mqttClient.on("error", (err) => {
  Log.error("MQTT error", err);
});
