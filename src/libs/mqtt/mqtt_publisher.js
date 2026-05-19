import { mqttClient } from "../../config/mqtt_config.js";
import { config } from "../../config/config.js";

export const publishScanRequest = async ({ cameras = [], correlationId }) => {
  for (const camera of cameras) {
    mqttClient.publish(
      config.mqttPublishTopic.replace("%CAMERA%", camera),
      JSON.stringify({
        correlationId,
      }),
    );
  }
};
