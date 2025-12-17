import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (user, roomNumber, price) => {
  const sql = postgres(config);

  await sql.begin(async (sql) => {
    const [userId] = await sql`
      INSERT INTO users (username, phone) 
      VALUES (${user.username}, ${user.phone}) 
      RETURNING id
    `;

    const [roomId] = await sql`
      SELECT id FROM rooms 
      WHERE room_number = ${roomNumber} 
      FOR UPDATE
    `;

    await sql`
      INSERT INTO orders (user_id, room_id, price)
      VALUES (${userId.id}, ${roomId.id}, ${price})
    `;

    await sql`
      UPDATE rooms 
      SET status = 'reserved' 
      WHERE id = ${roomId.id}
    `;
  });

  await sql.end();
};
// END
