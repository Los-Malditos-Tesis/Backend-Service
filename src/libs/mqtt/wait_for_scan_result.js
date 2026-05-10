import { scanEmitter } from "./events/scan_emitter.js";
import { Log } from "../logger/logger.js";

const waitForScanResultService = "wait For Scan Result: ";

export const waitForScanResults = (
  correlationId,
  { timeout = 5000, expectedResponses = null } = {},
) => {
  return new Promise((resolve) => {
    const results = [];

    Log.info(
      waitForScanResultService + correlationId,
      "LISTENER CREATED:",
      correlationId,
    );

    const cleanup = () => {
      clearTimeout(timer);
      scanEmitter.removeListener(correlationId, handler);
    };

    const finish = () => {
      cleanup();

      Log.info(
        waitForScanResultService + correlationId,
        "FINISHED WITH RESULTS:",
        results.length,
      );

      resolve(results);
    };

    const timer = setTimeout(() => {
      Log.warn(
        waitForScanResultService + correlationId,
        "TIMEOUT:",
        correlationId,
      );

      finish();
    }, timeout);

    const handler = (data) => {
      Log.info(waitForScanResultService + correlationId, "EVENT CAUGHT:", data);

      results.push(data);

      if (expectedResponses && results.length >= expectedResponses) {
        finish();
      }
    };

    scanEmitter.on(correlationId, handler);
  });
};
