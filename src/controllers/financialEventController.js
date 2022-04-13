import * as service from "../services/financialEventService.js";

export async function createFinancialEvent(req, res) {
  const { value, type } = req.body;

  if (!value || !type) {
    return res.sendStatus(422);
  }

  const financialTypes = ["INCOME", "OUTCOME"];
  if (!financialTypes.includes(type)) {
    return res.sendStatus(422);
  }

  if (value < 0) {
    return res.sendStatus(422);
  }

  await service.insertFinancialEvent({ userId: user.id, value, type });

  res.sendStatus(201);
}

export async function getUserFinancialEvents(req, res) {
  const events = await service.getUserFinancialEvents(user.id);

  res.send(events);
}

export async function financialEventsSum(req, res) {
  const sum = await service.getFinancialEventSum(user.id);

  res.send(sum);
}
