import * as financialEventRepository from "../repositories/financialEventRepository.js";

export async function insertFinancialEvent({ value, type }) {
  const { id } = res.locals.user;

  await financialEventRepository.insertEvent({ userId: id, value, type });
}

export async function getUserFinancialEvents() {
  const { id } = res.locals.user;
  const event = await financialEventRepository.findUserEvents(id);

  return event;
}

export async function getFinancialEventSum() {
  const { id } = res.locals.user;
  const events = await financialEventRepository.findUserEvents(id);

  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );

  return { sum };
}
