import cors from "cors";
import express from "express";
import handleErrorsMiddleware from "./middleware/handleErrorsMiddleware.js";
import authRouter from "./routers/authRouter.js";
import financialEventRouter from "./routers/financialEventRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(financialEventRouter);
app.use(handleErrorsMiddleware);

export default app;
