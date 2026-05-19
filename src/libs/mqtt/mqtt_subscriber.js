import { mqttClient } from "../../config/mqtt_config.js";
import { scanEmitter } from "./events/scan_emitter.js";
import { Log } from "../logger/logger.js";
import { consoleKeys } from "../logger/console/constant.js";
import { config } from "../../config/config.js";

const mqttSubscriber = "mqtt subscriber: ";

mqttClient.on("connect", () => {
  mqttClient.subscribe(config.mqttSubscribeTopic);
});

mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    Log.info(mqttSubscriber + consoleKeys.SuccessKey, "MQTT RECEIVED:", data);

    if (data.correlationId) {
      Log.info(
        mqttSubscriber + consoleKeys.SuccessKey,
        "EMITTING:",
        data.correlationId,
      );

      scanEmitter.emit(data.correlationId, data);
    }
  } catch (error) {
    Log.error(mqttSubscriber + consoleKeys.ErrorKey, error);
  }
});
