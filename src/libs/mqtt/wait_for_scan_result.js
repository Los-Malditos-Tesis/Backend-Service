import { scanEmitter } from "./events/scan_emitter.js";
import { Log } from "../logger/logger.js";

const waitForScanResultService = "wait For Scan Result: ";

export const waitForScanResult = (correlationId, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    Log.info(
      waitForScanResultService + correlationId,
      "LISTENER CREATED:",
      correlationId,
    );

    const timer = setTimeout(() => {
      Log.warn(
        waitForScanResultService + correlationId,
        "TIMEOUT:",
        correlationId,
      );

      scanEmitter.removeListener(correlationId, handler);

      reject(new Error("Scan timeout"));
    }, timeout);

    const handler = (data) => {
      Log.info(waitForScanResultService + correlationId, "EVENT CAUGHT:", data);

      clearTimeout(timer);

      resolve(data);
    };

    scanEmitter.once(correlationId, handler);
  });
};
