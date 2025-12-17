import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (book) => {
  // BEGIN (write your solution here)
  const sql = postgres(config);

  try {
    const reserved = await sql.reserve();

    try {
      await reserved`
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          author VARCHAR(255)
        )
      `;

      await reserved`
        INSERT INTO books (title, author)
        VALUES (${book.title}, ${book.author})
      `;

      const result = await reserved`
        SELECT * FROM books WHERE author = ${book.author}
      `;

    } finally {
      await reserved.release();
    }

  } finally {
    await sql.end();
  }
  // END
};
