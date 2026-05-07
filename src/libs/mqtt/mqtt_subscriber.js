import { mqttClient } from "../../config/mqtt_config.js";
import { scanEmitter } from "./events/scan_emitter.js";

mqttClient.on("connect", () => {
  mqttClient.subscribe("warehouse/+/scan/result");
});

mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    if (data.correlationId) {
      scanEmitter.emit(data.correlationId, data);
    }
  } catch (error) {
    console.error(error);
  }
});
