import { useEffect } from 'react';

import {
  Box,
  Divider,
  LinearProgress,
  Slider,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import Link from 'next/link';

import { useUIContext } from '@/contexts/UIContext';
import MatchSeed from '@/models/MatchSeed';
import {
  MATCH_MAP_COUNT_STEP,
  MAX_MATCH_MAP_COUNT,
  MIN_MATCH_MAP_COUNT,
  Z_INDICES,
} from '@/utils/constants';

/**
 * PageHeader component displays a fixed header with navigation items and a loading indicator.
 */
const PageHeader = () => {
  // Access the loading state from the UI context
  const { loading } = useUIContext();

  // Effect to disable pointer events on the body when loading
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }
    body.style.pointerEvents = loading ? 'none' : 'auto';
  }, [loading]);
  const currentMapCount = MatchSeed.getMatchMapCount();
  const mapCounts = _.range(
    MIN_MATCH_MAP_COUNT,
    MAX_MATCH_MAP_COUNT + MATCH_MAP_COUNT_STEP,
    MATCH_MAP_COUNT_STEP,
  );
  const mapCountMarks = mapCounts.map((value) => {
    return {
      value,
      label: value,
    };
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: Z_INDICES.PAGE_HEADER,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 4,
          px: 8,
          backgroundColor: 'grey.900',
          height: 56,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
            height: '100%',
          }}
        >
          {/* Service logo */}
          <Link href="/match">
            <Box
              component="img"
              src="/images/service_logo.png"
              sx={{ height: 32, mr: 10 }}
            />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 6 }}>
          <Typography fontSize={14} sx={{ color: 'background.paper' }}>
            問題数
          </Typography>
          <Slider
            size="small"
            defaultValue={currentMapCount}
            step={MATCH_MAP_COUNT_STEP}
            min={MIN_MATCH_MAP_COUNT}
            max={MAX_MATCH_MAP_COUNT}
            onChange={(__, value) => {
              MatchSeed.setMatchMapCount(value);
            }}
            color="primary"
            sx={{ width: 200, color: 'background.paper' }}
            marks={mapCountMarks}
            slotProps={{
              markLabel: {
                style: {
                  color: '#fff',
                },
              },
            }}
          />
        </Box>
      </Box>
      {/* Divider below the header */}
      <Divider />
      {/* Loading indicator */}
      <LinearProgress
        color="primary"
        sx={{ height: 4, visibility: loading ? 'visible' : 'hidden' }}
      />
    </Box>
  );
};

export default PageHeader;
