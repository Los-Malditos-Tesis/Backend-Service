import mqtt from "mqtt";
import { config } from "./config.js";

export const mqttClient = mqtt.connect(config.mqttUrl);

mqttClient.on("connect", () => {
  console.log("MQTT connected");
});

mqttClient.on("error", (err) => {
  console.error("MQTT error", err);
});
