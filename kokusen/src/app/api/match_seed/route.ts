import { NextRequest, NextResponse } from 'next/server';

import MatchSeed from '@/models/MatchSeed';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as {
    match_id: number;
    user_id: string;
    map_count: number;
  };
  const matchSeedSlug = await MatchSeed.generate(
    body.match_id,
    body.user_id,
    body.map_count,
  );
  return NextResponse.json({ slug: matchSeedSlug });
}
