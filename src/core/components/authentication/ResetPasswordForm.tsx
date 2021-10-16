import { useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import { TextField, Alert, Stack, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useAuth } from 'src/hooks/useAuth';
import { useIsMountedRef } from 'src/hooks/useIsMountedRef';
import { ResetPasswordSchema } from './validations';
import { getAuthState } from 'src/store/slices/auth';

type InitialValues = {
  email: string;
  afterSubmit?: string;
};

type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export function ResetPasswordForm({ onSent, onGetEmail }: ResetPasswordFormProps) {
  const { resetPassword } = useAuth();
  const { isError, errorMessage } = useSelector(getAuthState);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(errorMessage?.code, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const formik = useFormik<InitialValues>({
    initialValues: { email: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        resetPassword?.(values.email, () => {
          onSent();
          onGetEmail(formik.values.email);

          enqueueSnackbar('Reset password success', {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <Close />
              </IconButton>
            )
          });
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: errorMessage?.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <Button fullWidth size="large" type="submit" variant="contained" disabled={!dirty || isSubmitting}>
            Reset Password
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
