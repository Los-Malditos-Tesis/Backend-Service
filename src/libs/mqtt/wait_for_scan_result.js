import { scanEmitter } from "./events/scan_emitter.js";
import { Log } from "../logger/logger.js";
import { parseGS1 } from "../../utils/gs1_util.js";

const waitForScanResultService = "wait For Scan Result: ";

export const waitForProductMatch = (
  correlationId,
  productCode,
  timeout = 5000,
) => {
  return new Promise((resolve) => {
    const cleanup = () => {
      clearTimeout(timer);
      scanEmitter.removeListener(correlationId, handler);
    };

    const timer = setTimeout(() => {
      Log.warn(waitForScanResultService + correlationId, "NO MATCH FOUND");

      cleanup();

      resolve(null);
    }, timeout);

    const handler = (data) => {
      Log.info(waitForScanResultService + correlationId, "EVENT CAUGHT:", data);

      const match = (data.results || [])
        .map(parseGS1)
        .some((p) => p.gtin == productCode);

      if (!match) {
        return;
      }

      Log.info(
        waitForScanResultService + correlationId,
        "MATCH FOUND:",
        data.zoneId,
      );

      cleanup();

      resolve({
        zoneId: data.zoneId,
        cameraId: data.cameraId,
        results: data.results,
      });
    };

    scanEmitter.on(correlationId, handler);
  });
};
