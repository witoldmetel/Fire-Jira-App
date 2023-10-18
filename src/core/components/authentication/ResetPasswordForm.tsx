import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useFirebase } from 'src/hooks/useFirebase';
import { useIsMountedRef } from 'src/hooks/useIsMountedRef';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { ResetPasswordSchema } from './validations';

type InitialValues = {
  email: string;
  afterSubmit?: string;
};

type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export function ResetPasswordForm({ onSent, onGetEmail }: ResetPasswordFormProps) {
  const { resetPassword } = useFirebase();
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
            ),
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
    },
  });

  const { values, errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  const isSubmitDisabled = !values.email || !dirty || !!Object.keys(errors).length || isSubmitting;

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

          <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitDisabled}>
            Reset Password
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
