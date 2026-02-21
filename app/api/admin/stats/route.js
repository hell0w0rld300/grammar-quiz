import { sql, initDB, isDBAvailable } from '@/lib/db';

export async function GET() {
  if (!isDBAvailable()) {
    return Response.json({ error: 'DB not configured', dbAvailable: false }, { status: 200 });
  }
  try {
    await initDB();

    const [overall, byQuestion, byCategory, byDifficulty, recent] = await Promise.all([
      // Overall stats
      sql`
        SELECT
          COUNT(*)::int                                                  AS total_sessions,
          COALESCE(
            ROUND(AVG(CASE WHEN completed
              THEN total_score::numeric / NULLIF(max_score, 0) * 100 END
            ), 1), 0
          )::float                                                       AS avg_pass_rate,
          COALESCE(SUM(total_score)::int, 0)                            AS sum_score,
          COALESCE(SUM(max_score)::int, 0)                              AS sum_max
        FROM quiz_sessions
        WHERE completed = true
      `,
      // Per-question stats
      sql`
        SELECT
          question_id,
          question_category,
          question_difficulty,
          COUNT(*)::int                                                  AS total_attempts,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::int              AS correct_count,
          ROUND(
            AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1
          )::float                                                       AS pass_rate,
          MODE() WITHIN GROUP (ORDER BY selected_answer)                AS most_common_wrong
        FROM question_attempts
        WHERE is_correct = false OR true
        GROUP BY question_id, question_category, question_difficulty
        ORDER BY question_id
      `,
      // Per-category stats
      sql`
        SELECT
          question_category                                              AS category,
          COUNT(*)::int                                                  AS total_attempts,
          ROUND(
            AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1
          )::float                                                       AS pass_rate
        FROM question_attempts
        GROUP BY question_category
        ORDER BY pass_rate ASC
      `,
      // Per-difficulty stats
      sql`
        SELECT
          question_difficulty                                            AS difficulty,
          COUNT(*)::int                                                  AS total_attempts,
          ROUND(
            AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1
          )::float                                                       AS pass_rate
        FROM question_attempts
        GROUP BY question_difficulty
        ORDER BY CASE question_difficulty
          WHEN '初级' THEN 1 WHEN '中级' THEN 2 WHEN '高级' THEN 3 ELSE 4 END
      `,
      // Recent 20 sessions
      sql`
        SELECT
          id,
          created_at,
          completed_at,
          total_score,
          max_score,
          ROUND(
            total_score::numeric / NULLIF(max_score, 0) * 100, 1
          )::float                                                       AS pass_rate
        FROM quiz_sessions
        WHERE completed = true
        ORDER BY completed_at DESC
        LIMIT 20
      `,
    ]);

    return Response.json({
      dbAvailable: true,
      overall:       overall.rows[0],
      byQuestion:    byQuestion.rows,
      byCategory:    byCategory.rows,
      byDifficulty:  byDifficulty.rows,
      recentSessions: recent.rows,
    });
  } catch (err) {
    console.error('GET /api/admin/stats error:', err);
    return Response.json({ error: String(err), dbAvailable: false }, { status: 200 });
  }
}
