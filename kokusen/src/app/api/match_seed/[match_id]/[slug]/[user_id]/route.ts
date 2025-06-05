import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import MatchSeed from '@/models/MatchSeed';

export async function GET(
  __: NextRequest,
  { params }: { params: { match_id: string; slug: string; user_id: string } },
): Promise<NextResponse> {
  const { match_id, slug, user_id } = await params;
  const matchSeeds = await MatchSeed.fetch(_.parseInt(match_id), slug, user_id);
  return NextResponse.json(matchSeeds);
}
