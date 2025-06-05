import { memo } from 'react';

import { Box, SxProps } from '@mui/material';

interface VSIconProps {
  sx?: SxProps;
}

const VSIcon = (props: VSIconProps) => {
  const { sx } = props;
  return <Box component="img" src="/images/vs_icon.png" sx={sx} />;
};

export default memo(VSIcon);
