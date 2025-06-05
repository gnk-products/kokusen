'use client';

import { ReactNode, memo } from 'react';

import { Box, SxProps } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import PageHeader from '@/components/PageHeader';

interface PageLayoutProps {
  children?: ReactNode;
  sx?: SxProps;
}

/**
 * A top-level component that wraps all pages. It provides a basic layout with a
 * header and a content area. It also provides a theme that is updated based on
 * the current wall's color.
 *
 * @param {PageLayoutProps} props - The props for the component.
 * @param {ReactNode} [props.children] - The children to render inside the content area.
 */
const PageLayout = (props: PageLayoutProps) => {
  return (
    <Box>
      {/* A snackbar provider that displays snakbars at the top right of the screen */}
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        {/* A theme provider that updates the theme based on the current wall's color */}

        {/* A page header that displays the wall's name and a settings button */}
        <PageHeader />

        {/* The content area that renders the children */}
        <Box
          sx={{ mt: 14, p: 8, backgroundColor: 'background.main', ...props.sx }}
        >
          {props.children}
        </Box>
      </SnackbarProvider>
    </Box>
  );
};

export default memo(PageLayout);
