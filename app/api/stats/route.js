import { sql, initDB, isDBAvailable } from '@/lib/db';

export async function GET() {
  if (!isDBAvailable()) {
    return Response.json({
      totalSessions: 0,
      avgPassRate: 0,
      totalAttempts: 0,
      overallCorrectRate: 0,
      dbAvailable: false,
    });
  }
  try {
    await initDB();

    const [sessRes, attRes] = await Promise.all([
      sql`
        SELECT
          COUNT(*)::int                                                           AS total_sessions,
          COALESCE(
            ROUND(
              AVG(CASE WHEN completed
                THEN total_score::numeric / NULLIF(max_score, 0) * 100 END
              ), 1
            ), 0
          )::float                                                                AS avg_pass_rate
        FROM quiz_sessions
        WHERE completed = true
      `,
      sql`
        SELECT
          COUNT(*)::int                                                           AS total_attempts,
          COALESCE(
            ROUND(
              SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::numeric
              / NULLIF(COUNT(*), 0) * 100, 1
            ), 0
          )::float                                                                AS correct_rate
        FROM question_attempts
      `,
    ]);

    return Response.json({
      totalSessions:    sessRes.rows[0].total_sessions,
      avgPassRate:      sessRes.rows[0].avg_pass_rate,
      totalAttempts:    attRes.rows[0].total_attempts,
      overallCorrectRate: attRes.rows[0].correct_rate,
      dbAvailable: true,
    });
  } catch (err) {
    console.error('GET /api/stats error:', err);
    return Response.json({ totalSessions: 0, avgPassRate: 0, totalAttempts: 0, overallCorrectRate: 0, dbAvailable: false });
  }
}
