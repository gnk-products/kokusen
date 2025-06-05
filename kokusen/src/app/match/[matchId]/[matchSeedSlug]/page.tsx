import { memo } from 'react';

import _ from 'lodash';

import MatchContent from '@/app/match/components/MatchContent';
import PageLayout from '@/components/PageLayout';
import { UIContextProvider } from '@/contexts/UIContext';
import Match from '@/models/Match';

const MatchPage = async ({
  params,
}: {
  params: { matchId: string; matchSeedSlug: string };
}) => {
  const { matchId, matchSeedSlug } = await params;
  const match = await Match.fetch([_.parseInt(matchId)]);
  if (!match || !match[0]) {
    throw new Error('not found');
  }
  return (
    <UIContextProvider>
      <PageLayout sx={{ p: 0 }}>
        <MatchContent match={match[0]} matchSeedSlug={matchSeedSlug} />
      </PageLayout>
    </UIContextProvider>
  );
};

export default memo(MatchPage);
