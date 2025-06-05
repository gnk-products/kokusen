import { memo } from 'react';

import { Box } from '@mui/material';

import MatchCard from '@/app/match/components/MatchCard';
import PageLayout from '@/components/PageLayout';
import { UIContextProvider } from '@/contexts/UIContext';
import Match from '@/models/Match';

const MatchListPage = async () => {
  const matchList = await Match.fetch();
  return (
    <UIContextProvider>
      <PageLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
            }}
          >
            {matchList.map((match) => {
              return <MatchCard match={match} key={match.id} />;
            })}
          </Box>
        </Box>
      </PageLayout>
    </UIContextProvider>
  );
};

export default memo(MatchListPage);
