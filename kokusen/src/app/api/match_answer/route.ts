import { NextRequest, NextResponse } from 'next/server';

import MatchAnswer, { MatchAnswerInputType } from '@/models/MatchAnswer';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as MatchAnswerInputType;
  const matchAnswer = await MatchAnswer.create(
    body.match_seed_id,
    body.user_id,
    body.answer_id,
  );
  return NextResponse.json(matchAnswer);
}
