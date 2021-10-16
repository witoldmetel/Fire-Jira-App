import { Form, FormikProvider, useFormik } from 'formik';

import { TextField, Alert, Stack, Button } from '@mui/material';

import { useAuth } from 'src/hooks/useAuth';
import { useIsMountedRef } from 'src/hooks/useIsMountedRef';
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
  // const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const formik = useFormik<InitialValues>({
    initialValues: { email: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // resetPassword?.(values.email);

        if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.email);
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: (error as any).message });
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
