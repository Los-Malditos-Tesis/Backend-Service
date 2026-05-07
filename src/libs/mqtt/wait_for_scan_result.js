import { scanEmitter } from "./events/scan_emitter.js";

export const waitForScanResult = (correlationId, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      scanEmitter.removeListener(correlationId, handler);

      reject(new Error("Scan timeout"));
    }, timeout);

    const handler = (data) => {
      clearTimeout(timer);

      scanEmitter.removeListener(correlationId, handler);

      resolve(data);
    };

    scanEmitter.once(correlationId, handler);
  });
};
