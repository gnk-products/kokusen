import { memo } from 'react';
import { CountryCode, CountryFlag } from 'react-country-flags-lazyload';

import { Box, SxProps, Typography } from '@mui/material';

import { CountryType } from '@/models/Match';

interface CountryWithFlagProps {
  country: CountryType;
  sx?: SxProps;
  textSx?: SxProps;
  flagStyle?: { [key: string]: string | number };
}

const CountryWithFlag = ({
  country,
  sx,
  textSx,
  flagStyle,
}: CountryWithFlagProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 2,
        height: 40,
        flex: 1,
        justifyContent: 'center',
        ...sx,
      }}
    >
      <CountryFlag
        countryCode={country.code as CountryCode}
        style={{ width: 30, ...flagStyle }}
      />
      <Typography fontSize="inherit" sx={{ mb: 1, ...textSx }}>
        {country.name_ja}
      </Typography>
    </Box>
  );
};

export default memo(CountryWithFlag);
