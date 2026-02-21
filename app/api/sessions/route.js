import { sql, initDB, isDBAvailable } from '@/lib/db';

export async function POST() {
  if (!isDBAvailable()) {
    return Response.json({ id: null, error: 'DB not configured' }, { status: 200 });
  }
  try {
    await initDB();
    const result = await sql`
      INSERT INTO quiz_sessions DEFAULT VALUES
      RETURNING id
    `;
    return Response.json({ id: result.rows[0].id });
  } catch (err) {
    console.error('POST /api/sessions error:', err);
    return Response.json({ id: null, error: 'DB error' }, { status: 200 });
  }
}
