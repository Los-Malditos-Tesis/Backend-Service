import { mqttClient } from "../../config/mqtt_config.js";

export const publishScanRequest = async ({
  warehouseId,
  productCode,
  correlationId,
}) => {
  mqttClient.publish(
    `warehouse/${warehouseId}/scan`,
    JSON.stringify({
      productCode,
      correlationId,
    }),
  );
};
