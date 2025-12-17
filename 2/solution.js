import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (articles) => {
  const sql = postgres(config);

  try {
    const result = await sql`
      INSERT INTO articles ${sql(articles, 'title', 'description')}
      RETURNING id
    `;

    return result.map(row => row.id);

  } finally {
    await sql.end();
  }
};
// END
