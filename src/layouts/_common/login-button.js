import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//paths
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  return (
    <Button
      component={RouterLink}
      href={paths.auth.firebase.login}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
