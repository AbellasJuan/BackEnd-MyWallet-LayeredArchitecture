import connection from "../database.js";

export async function insertEvent({ userId, value, type }) {
  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [userId, value, type]
  );
}

export async function findUserEvents(userId) {
  const { rows } = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [userId]
  );

  return rows;
}
