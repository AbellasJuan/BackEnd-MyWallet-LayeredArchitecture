import { verifyToken } from "../services/authService.js";

export async function ensureAuthMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = await verifyToken(token);
  } catch {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  next();
}
