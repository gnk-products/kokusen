'use client';

import { memo, useEffect, useMemo, useState } from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, SxProps, Typography } from '@mui/material';
import _ from 'lodash';
import dynamic from 'next/dynamic';

import GoogleStreetGL from '@/app/match/components/GoogleStreetGL';
import Overlay from '@/components/Overlay';
import { CountryType, MatchType } from '@/models/Match';
import MatchAnswer, { MatchAnswerType } from '@/models/MatchAnswer';
import MatchSeed, { MatchSeedType } from '@/models/MatchSeed';

import MatchAnswerAction from './MatchAnswerAction';

interface MatchContentProps {
  match: MatchType;
  matchSeedSlug: string;
  sx?: SxProps;
}

const MatchContent = ({ match, matchSeedSlug, sx }: MatchContentProps) => {
  const [matchSeeds, setMatchSeeds] = useState<MatchSeedType[] | null>(null);
  const [answer, setAnswer] = useState<MatchAnswerType | null>(null);
  const MapGL = useMemo(
    () =>
      dynamic(() => import('./MapGL'), {
        ssr: false,
      }),
    [],
  );
  const fetchMatchSeeds = async () => {
    if (matchSeeds) {
      return;
    }
    const res = await MatchSeed.fetchViaApi(match.id, matchSeedSlug);
    setMatchSeeds(_.sortBy(res, (item) => item.order));
  };
  const handleQuit = () => {
    location.href = '/match';
  };
  useEffect(() => {
    fetchMatchSeeds();
  }, []);
  if (!matchSeeds) {
    return <Box />;
  }
  const currentSeedIndex = matchSeeds.findIndex(
    (seed) => seed.matchAnswer.length === 0,
  );
  if (currentSeedIndex < 0) {
    const markerConfigs = matchSeeds.map((seed, index) => {
      const matchAnswer = seed.matchAnswer[0];
      const isCorrect = matchAnswer
        ? matchAnswer.answer_id === matchAnswer.user_answer_id
        : false;
      const icon = isCorrect ? (
        <CircleOutlinedIcon sx={{ color: 'primary.main' }} />
      ) : (
        <CloseIcon sx={{ color: 'error.main' }} />
      );
      return {
        tooltip: (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography mr={3}>{index + 1}.</Typography>
            {icon}
          </Box>
        ),
        tooltipProps: { permanent: true },
        position: [seed.mapImage.lat, seed.mapImage.long] as [number, number],
      };
    });
    return (
      <Box>
        <MapGL
          markerConfigs={markerConfigs}
          zoom={5}
          style={{
            height: 'calc(100vh - 60px)',
          }}
        />
        <Overlay
          sx={{
            bottom: 30,
            height: 160,
            textAlign: 'center',
            py: 2,
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              rowGap: 4,
            }}
          >
            <Typography fontSize={20} sx={{ color: 'background.paper' }}>
              Results
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 4,
              }}
            >
              {markerConfigs.map((config) => {
                return (
                  <Typography
                    key={config.position.join(',')}
                    sx={{ color: 'background.paper' }}
                  >
                    {config.tooltip}
                  </Typography>
                );
              })}
            </Box>
            <Button variant="outlined" onClick={handleQuit} size="small">
              Quit
            </Button>
          </Box>
        </Overlay>
      </Box>
    );
  }
  const currentSeed = matchSeeds[currentSeedIndex];
  const currentImage = currentSeed.mapImage;
  const countries = match.matchCountries.map((item) => item.country);
  const handleAnswer = async (country: CountryType) => {
    const res = await MatchAnswer.createViaApi(currentSeed.id, country.id);
    setAnswer(res);
  };
  const handleNextQuestion = async () => {
    if (!answer) {
      return;
    }
    currentSeed.matchAnswer = [answer];
    setMatchSeeds([...matchSeeds]);
    setAnswer(null);
  };
  const isCorrect = answer ? answer.answer_id === answer.user_answer_id : false;
  const isLast = currentSeedIndex === matchSeeds.length - 1;
  return (
    <Box sx={sx}>
      {answer ? (
        <Box>
          <MapGL
            markerConfigs={[
              {
                position: [currentImage.lat, currentImage.long] as [
                  number,
                  number,
                ],
              },
            ]}
            zoom={7}
            style={{
              height: 'calc(100vh - 60px)',
            }}
          />
          <Overlay
            sx={{
              bottom: 30,
              height: 160,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                px: 4,
                rowGap: 4,
              }}
            >
              <Typography
                sx={{ color: 'background.paper' }}
                variant="subtitle2"
              >
                Question. {currentSeedIndex + 1}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <Box
                  component="img"
                  sx={{ width: isCorrect ? 30 : 20 }}
                  src={
                    isCorrect ? '/images/correct.png' : '/images/incorrect.png'
                  }
                />
                <Typography
                  fontSize={20}
                  sx={{ color: 'background.paper', mr: 4 }}
                >
                  {isCorrect ? 'Correct !' : 'Incorrect !'}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  size="medium"
                >
                  {isLast ? 'Results' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Overlay>
        </Box>
      ) : (
        <GoogleStreetGL
          lat={currentImage.lat}
          long={currentImage.long}
          style={{
            height: 'calc(100vh - 60px)',
            width: '100%',
          }}
        />
      )}
      <MatchAnswerAction
        countries={countries}
        title={`Question. ${currentSeedIndex + 1} / ${matchSeeds.length}`}
        onAnswer={handleAnswer}
      />
    </Box>
  );
};

export default memo(MatchContent);
