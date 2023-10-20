import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { useFirebase, useIsMountedRef } from 'src/core/hooks';
import { PATH_AUTH } from 'src/routes/paths';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { SocialForm } from './SocialForm';
import { LoginSchema } from './validations';

type InitialValues = {
  email: string;
  password: string;
  remember: boolean;

  afterSubmit?: string;
};

export function LoginForm() {
  const { login, loginWithGoogle } = useFirebase();
  const { errorMessage } = useSelector(getAuthState);
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        await login(values.email, values.password, values.remember);

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        resetForm();

        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: errorMessage?.code });
        }
      }
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  const handleShowPassword = () => setShowPassword((show) => !show);

  const isSubmitDisabled = !values.email || !values.password || !dirty || !!Object.keys(errors).length || isSubmitting;

  return (
    <FormikProvider value={formik}>
      <SocialForm onGoogleClick={loginWithGoogle} />

      <Divider className="my-6">
        <Typography variant="body2">OR</Typography>
      </Divider>

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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Forgot password?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitDisabled}>
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
