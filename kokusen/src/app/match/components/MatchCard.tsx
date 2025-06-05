'use client';

import { memo } from 'react';

import { Box, SxProps } from '@mui/material';
import _ from 'lodash';

import CountryWithFlag from '@/app/match/components/CountryWithFlag';
import VSIcon from '@/components/VSIcon';
import { MatchType } from '@/models/Match';
import MatchSeed from '@/models/MatchSeed';
import { Z_INDICES } from '@/utils/constants';

interface MatchCardProps {
  match: MatchType;
  sx?: SxProps;
}

const MatchCard = ({ match, sx }: MatchCardProps) => {
  const matchCountries = _.sortBy(
    _.cloneDeep(match.matchCountries),
    (country) => country.country.code,
  );
  const handleCreateMatch = async () => {
    const res = await MatchSeed.generateViaApi(match.id);
    location.href = `/match/${match.id}/${res.slug}`;
  };
  const isPortrait = matchCountries.length >= 3;
  return (
    <Box
      sx={{
        position: 'relative',
        width: 600,
        height: 250,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        ...(isPortrait && {
          display: 'flex',
          boxSizing: 'border-box',
        }),
        ...sx,
      }}
      onClick={handleCreateMatch}
    >
      {matchCountries.map((matchCountry, index) => {
        const isLast = index + 1 === matchCountries.length;
        const containerSx: SxProps = isPortrait
          ? {
              borderRight: isLast ? 'none' : '4px solid white',
              boxSizing: 'border-box',
              pr: isLast ? 0 : 2,
              flex: 1,
            }
          : {
              position: 'absolute',
              width: '100%',
              clipPath: isLast
                ? 'polygon(100% 10%, 100% 100%, 0% 100%, 0% 90%)'
                : 'polygon(0 0, 100% 0, 100% 10%, 0 90%)',
            };
        const contentContainerSx: SxProps = (() => {
          if (isPortrait) {
            return {
              position: 'relative',
              justifyContent: 'center',
            };
          }
          return isLast
            ? {
                pt: 20,
                pb: 0,
                pl: 0,
                pr: 10,
              }
            : {
                pt: 0,
                pb: 20,
                pl: 10,
                pr: 0,
              };
        })();
        return (
          <Box
            key={matchCountry.country.id}
            sx={{
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${matchCountry.country.sm_image})`,
              backgroundColor: 'rgba(255,255,255,0.6)',
              backgroundBlendMode: 'lighten',
              ...containerSx,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                ...contentContainerSx,
              }}
            >
              <CountryWithFlag
                country={matchCountry.country}
                flagStyle={{ width: 40 }}
                textSx={{ mb: 2 }}
                sx={{
                  justifyContent: (() => {
                    if (isPortrait) {
                      return 'center';
                    }
                    return isLast ? 'flex-end' : 'flex-start';
                  })(),
                  fontSize: isPortrait ? '1.1rem' : '1.2rem',
                  mt: isPortrait ? 3 : 0,
                }}
              />
              {isPortrait && !isLast ? (
                <VSIcon
                  sx={{
                    position: 'absolute',
                    right: -20,
                    top: '47%',
                    width: 20,
                    zIndex: Z_INDICES.MATCH_CARD_ELEMENT,
                  }}
                />
              ) : null}
            </Box>
          </Box>
        );
      })}
      {isPortrait ? null : (
        <>
          <Box
            sx={{
              position: 'absolute',
              bottom: '9%',
              left: 0,
              width: '110%',
              height: 4,
              backgroundColor: 'grey.100',
              transform: 'rotate(-18.5deg)',
              transformOrigin: 'bottom left',
              zIndex: Z_INDICES.MATCH_CARD_ELEMENT,
            }}
          ></Box>
          <VSIcon
            sx={{
              position: 'absolute',
              top: '46.5%',
              left: '48%',
              width: 20,
              zIndex: Z_INDICES.MATCH_CARD_ELEMENT,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default memo(MatchCard);
