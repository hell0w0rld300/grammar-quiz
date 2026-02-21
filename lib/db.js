import { sql } from '@vercel/postgres';

// Check if DB is configured
export const isDBAvailable = () => {
  return !!(
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  );
};

// Initialize tables (idempotent)
export async function initDB() {
  if (!isDBAvailable()) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id          SERIAL PRIMARY KEY,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        completed_at TIMESTAMPTZ,
        total_score INTEGER NOT NULL DEFAULT 0,
        max_score   INTEGER NOT NULL DEFAULT 0,
        completed   BOOLEAN NOT NULL DEFAULT FALSE
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS question_attempts (
        id                  SERIAL PRIMARY KEY,
        session_id          INTEGER NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
        question_id         INTEGER NOT NULL,
        question_category   VARCHAR(100) NOT NULL,
        question_difficulty VARCHAR(20)  NOT NULL,
        selected_answer     VARCHAR(255),
        correct_answer      VARCHAR(255) NOT NULL,
        is_correct          BOOLEAN NOT NULL,
        attempted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_attempts_question_id
        ON question_attempts(question_id)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_completed
        ON quiz_sessions(completed)
    `;
  } catch (err) {
    console.error('DB init error:', err);
  }
}

export { sql };
