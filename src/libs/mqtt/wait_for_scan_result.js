import { scanEmitter } from "./events/scan_emitter.js";
import { Log } from "../logger/logger.js";
import { parseGS1 } from "../../utils/gs1_util.js";

const waitForScanResultService = "wait For Scan Result: ";

export const waitForScanResults = (
  correlationId,
  productCode,
  pendingCameras = [],
  timeout = 5000,
) => {
  return new Promise((resolve) => {
    const detections = [];

    // convertir array -> Set
    const pending = new Set(pendingCameras);

    const cleanup = () => {
      clearTimeout(timer);
      scanEmitter.removeListener(correlationId, handler);
    };

    const finish = () => {
      Log.info(waitForScanResultService + correlationId, "FINISHED", {
        detections: detections.length,
      });

      cleanup();

      resolve(detections);
    };

    const timer = setTimeout(() => {
      Log.warn(waitForScanResultService + correlationId, "TIMEOUT");

      finish();
    }, timeout);

    const handler = (data) => {
      Log.info(waitForScanResultService + correlationId, "EVENT CAUGHT:", data);

      // ignorar cámaras no esperadas
      if (!pending.has(data.cameraId)) {
        return;
      }

      // marcar como respondida
      pending.delete(data.cameraId);

      const parsedResults = (data.results || []).map(parseGS1);

      const productMatches = parsedResults.filter((p) => p.gtin == productCode);

      if (productMatches.length) {
        detections.push({
          zoneId: data.zoneId,
          cameraId: data.cameraId,
          matches: productMatches,
        });

        Log.info(waitForScanResultService + correlationId, "MATCH FOUND:", {
          cameraId: data.cameraId,
        });
      }

      // todas respondieron
      if (pending.size === 0) {
        Log.info(
          waitForScanResultService + correlationId,
          "ALL CAMERAS RESPONDED",
        );

        finish();
      }
    };

    scanEmitter.on(correlationId, handler);
  });
};
