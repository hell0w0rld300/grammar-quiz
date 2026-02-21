import { sql, isDBAvailable } from '@/lib/db';

export async function PUT(request, { params }) {
  if (!isDBAvailable()) {
    return Response.json({ success: false });
  }
  try {
    const { totalScore, maxScore } = await request.json();
    const { id } = params;
    await sql`
      UPDATE quiz_sessions
      SET
        completed     = true,
        completed_at  = NOW(),
        total_score   = ${totalScore},
        max_score     = ${maxScore}
      WHERE id = ${id}
    `;
    return Response.json({ success: true });
  } catch (err) {
    console.error('PUT /api/sessions/[id] error:', err);
    return Response.json({ success: false }, { status: 200 });
  }
}
