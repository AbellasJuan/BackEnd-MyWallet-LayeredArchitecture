const serviceErrorToStatusCode = {
  unauthorized: 401,
  conflict: 409,
};

export function unauthorizedError() {
  return { type: "unauthorized" };
}

export function conflictError() {
  return { type: "conflict" };
}

export default function handleErrorsMiddleware(err, req, res, next) {
  if (err.type) {
    res.sendStatus(serviceErrorToStatusCode[err.type]);
  }

  res.sendStatus(500);
}
