import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';

import {
  Button,
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';

import { PATH_AUTH } from 'src/routes/paths';
import { useAuth } from 'src/hooks/useAuth';
import { useIsMountedRef } from 'src/hooks/useIsMountedRef';
import { LoginSchema } from './validations';
import { getAuthState } from 'src/store/slices/auth';

type InitialValues = {
  email: string;
  password: string;
  remember: boolean;

  afterSubmit?: string;
};

export function LoginForm() {
  const { login } = useAuth();
  const { isError, errorMessage } = useSelector(getAuthState);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(errorMessage?.code, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        const result = await login(values.email, values.password);

        if (result) {
          enqueueSnackbar('Login success', {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <Close />
              </IconButton>
            )
          });
        }

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        enqueueSnackbar(errorMessage?.code, { variant: 'error' });
        resetForm();

        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: errorMessage?.code });
        }
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
            disabled
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Forgot password?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained" disabled={!dirty || isSubmitting}>
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
