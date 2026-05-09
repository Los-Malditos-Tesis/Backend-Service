import mqtt from "mqtt";
import { config } from "./config.js";
import { Log } from "../libs/logger/logger.js";

export const mqttClient = mqtt.connect(config.mqttUrl, {
  clientId: "mqttjs_e9f875de",
  username: "tesis",
  password: "tesis12345",
  rejectUnauthorized: false,
});

mqttClient.on("connect", () => {
  Log.info("MQTT connected");
});

mqttClient.on("error", (err) => {
  Log.error("MQTT error", err);
});
