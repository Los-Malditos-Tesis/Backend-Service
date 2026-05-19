import { mqttClient } from "../../config/mqtt_config.js";

export const publishScanRequest = async ({ cameras = [], correlationId }) => {
  for (const camera of cameras) {
    mqttClient.publish(
      `camera/${camera}/scan`,
      JSON.stringify({
        correlationId,
      }),
    );
  }
};
