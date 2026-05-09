import { Router } from "express";
import { createEventController } from "../controller/scan_event_controller.js";

const scanRouter = Router();

scanRouter.post("/", createEventController);

export default scanRouter;
