'use client';

import { memo } from 'react';

import { Box, Button, SxProps, Typography } from '@mui/material';

import CountryWithFlag from '@/app/match/components/CountryWithFlag';
import { CountryType } from '@/models/Match';
import { Z_INDICES } from '@/utils/constants';

interface MatchAnswerActionProps {
  countries: CountryType[];
  onAnswer?: (country: CountryType) => void;
  title?: string;
  sx?: SxProps;
}

const MatchAnswerAction = (props: MatchAnswerActionProps) => {
  const { countries, title, onAnswer, sx } = props;
  return (
    <Box
      sx={{
        p: 3,
        position: 'fixed',
        bottom: 30,
        right: 20,
        backgroundColor: 'grey.200',
        opacity: 0.5,
        borderRadius: 2,
        transition: 'transform 0.2s ease',
        transformOrigin: 'bottom right',
        zIndex: Z_INDICES.MATCH_ANSWER_ACTION,
        '&: hover': {
          p: 4,
          opacity: 0.8,
          transform: 'scale(1.2)',
        },
        ...sx,
      }}
    >
      {title ? (
        <Typography sx={{ fontSize: 12, mb: 2 }}>{title}</Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          fontSize: 12,
        }}
      >
        {countries.map((country) => (
          <Button
            key={country.id}
            variant="outlined"
            size="small"
            sx={{ height: 40 }}
            onClick={() => {
              if (onAnswer) {
                onAnswer(country);
              }
            }}
          >
            <CountryWithFlag country={country} sx={{ mt: 1 }} />
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default memo(MatchAnswerAction);
