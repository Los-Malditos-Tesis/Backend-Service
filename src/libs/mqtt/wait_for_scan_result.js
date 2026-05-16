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

    const pending = new Set(pendingCameras);

    const responded = new Set();

    const cleanup = () => {
      clearTimeout(timer);
      scanEmitter.removeListener(correlationId, handler);
    };

    const finish = () => {
      cleanup();

      resolve({
        detections,
        respondedCameras: [...responded],
        pendingCameras: [...pending],
      });
    };

    const timer = setTimeout(() => {
      Log.warn(waitForScanResultService + correlationId, "TIMEOUT");

      finish();
    }, timeout);

    const handler = (data) => {
      if (!pending.has(data.cameraCode)) {
        return;
      }

      pending.delete(data.cameraCode);

      responded.add(data.cameraCode);

      const parsedResults = (data.results || []).map(parseGS1);

      const productMatches = parsedResults.filter((p) => p.gtin == productCode);

      if (productMatches.length) {
        detections.push({
          cameraCode: data.cameraCode,
          matches: productMatches,
        });
      }

      // todas respondieron
      if (pending.size === 0) {
        finish();
      }
    };

    scanEmitter.on(correlationId, handler);
  });
};
