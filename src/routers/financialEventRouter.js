import { Router } from "express";
import * as financialEventController from "../controllers/financialEventController.js";
import { ensureAuthMiddleware } from "../middleware/ensureAuthMiddleware.js";

const financialEventRouter = Router();
financialEventRouter.post(
  "/financial-events",
  ensureAuthMiddleware,
  financialEventController.createFinancialEvent
);
financialEventRouter.get(
  "/financial-events",
  ensureAuthMiddleware,
  financialEventController.getUserFinancialEvents
);
financialEventRouter.get(
  "/financial-events/sum",
  ensureAuthMiddleware,
  financialEventController.financialEventsSum
);

export default financialEventRouter;
