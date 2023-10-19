import { useEffect, useState } from 'react';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { useFirebase, useIsMountedRef } from 'src/core/hooks';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { SocialForm } from './SocialForm';
import { RegisterSchema } from './validations';

type InitialValues = {
  email: string;
  password: string;

  afterSubmit?: string;
};

export function RegisterForm() {
  const { register, loginWithGoogle } = useFirebase();
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

  const googleRegisterHandler = () =>
    loginWithGoogle(() =>
      enqueueSnackbar('Register success', {
        variant: 'success',
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <Close />
          </IconButton>
        ),
      })
    );

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(values.email, values.password, () =>
          enqueueSnackbar('Register success', {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <Close />
              </IconButton>
            ),
          })
        );

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        enqueueSnackbar(errorMessage?.code, { variant: 'error' });

        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: errorMessage?.code });
        }
      }
    },
  });

  const { values, errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  const handleShowPassword = () => setShowPassword((show) => !show);

  const isSubmitDisabled = !values.email || !values.password || !dirty || !!Object.keys(errors).length || isSubmitting;

  return (
    <FormikProvider value={formik}>
      <SocialForm onGoogleClick={googleRegisterHandler} />

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
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitDisabled}>
            Register
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
