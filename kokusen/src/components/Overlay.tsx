import { ReactNode } from 'react';

import { Box, SxProps } from '@mui/material';

import { Z_INDICES } from '@/utils/constants';

interface OverlayProps {
  sx?: SxProps;
  children?: ReactNode;
}

const Overlay = (props: OverlayProps) => {
  const { sx, children } = props;
  return (
    <Box
      sx={{
        left: 0,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'grey.800',
        opacity: 0.9,
        zIndex: Z_INDICES.OVERLAY,
        height: 200,
        transition: 'background-color 0.3s ease',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Overlay;
