import { NavLink as RouterLink } from 'react-router-dom';
import { Box, Container, Link, Stack, Typography } from '@mui/material';

import { PATH_PAGE } from 'src/routes/paths';

export function DashboardFooter() {
  return (
    <Box className="relative p-6 sm:p-12 text-common-white bg-center bg-no-repeat bg-[#0a0b0c] bg-cover bg-[url(/static/overlay.svg)]">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="caption" component="p">
            witoldmetel © 2021 | Fire Jira
          </Typography>

          <Stack direction="row">
            <Link
              className="text-primary-main mr-2 transition-opacity duration-300 hover:opacity-50 hover:no-underline subtitle2"
              to={PATH_PAGE.about}
              component={RouterLink}
              underline="none"
            >
              About Me
            </Link>
            <Link
              className="text-primary-main mr-2 transition-opacity duration-300 hover:opacity-50 hover:no-underline subtitle2"
              to={PATH_PAGE.contact}
              component={RouterLink}
              underline="none"
            >
              Contact Me
            </Link>
            <Link
              className="text-primary-main mr-2 transition-opacity duration-300 hover:opacity-50 hover:no-underline subtitle2"
              component={Link}
              href="https://firejira-storybook.netlify.app/"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <span className="text-[#FF4785]">Storybook</span>
            </Link>
            <Link
              className="text-primary-main mr-2 transition-opacity duration-300 hover:opacity-50 hover:no-underline subtitle2"
              component={Link}
              href="https://github.com/witoldmetel/Fire-Jira-App"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              Github
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
