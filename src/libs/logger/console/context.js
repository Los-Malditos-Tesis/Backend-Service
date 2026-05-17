import { randomUUID } from "crypto";
import { AsyncLocalStorage } from "async_hooks";

export const createCtx = (values = {}) => {
  return {
    requestId: randomUUID(),
    ...values,
  };
};

export const als = new AsyncLocalStorage();
