import { sql, isDBAvailable } from '@/lib/db';

export async function POST(request, { params }) {
  if (!isDBAvailable()) {
    return Response.json({ success: false });
  }
  try {
    const { questionId, category, difficulty, results } = await request.json();
    const { id: sessionId } = params;

    for (const r of results) {
      await sql`
        INSERT INTO question_attempts
          (session_id, question_id, question_category, question_difficulty,
           selected_answer, correct_answer, is_correct)
        VALUES
          (${sessionId}, ${questionId}, ${category}, ${difficulty},
           ${r.selected ?? null}, ${r.correct}, ${r.isCorrect})
      `;
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('POST /api/sessions/[id]/attempts error:', err);
    return Response.json({ success: false }, { status: 200 });
  }
}
