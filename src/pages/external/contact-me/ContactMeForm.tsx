import { useFormik, Form, FormikProvider } from 'formik';

import { Button, Container, Typography, Theme, TextField, Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { MotionInView, fadeInUp } from 'src/core/components';
import { ContactSchema } from './validations';

type InitialValues = {
  name: string;
  email: string;
  subject: string;
  message: string;

  afterSubmit?: string;
};

export function ContactMeForm() {
  const classes = useStyles();

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        console.log('send', values);
      } catch (error) {
        resetForm();
        setSubmitting(false);
        setErrors({ afterSubmit: error as string });
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  return (
    <Container maxWidth="lg">
      <div className={classes.content}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <Stack spacing={5}>
              <MotionInView variants={fadeInUp}>
                <Typography variant="h3">Any questions?</Typography>
              </MotionInView>

              <Stack spacing={3}>
                <MotionInView variants={fadeInUp}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </MotionInView>

                <MotionInView variants={fadeInUp}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </MotionInView>

                <MotionInView variants={fadeInUp}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Subject"
                    {...getFieldProps('subject')}
                    error={Boolean(touched.subject && errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />
                </MotionInView>

                <MotionInView variants={fadeInUp}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Enter your message here."
                    {...getFieldProps('message')}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                    multiline
                    rows={5}
                  />
                </MotionInView>
              </Stack>

              <MotionInView variants={fadeInUp}>
                <Button size="large" type="submit" variant="contained" disabled={!dirty || isSubmitting}>
                  Send Now
                </Button>
              </MotionInView>
            </Stack>
          </Form>
        </FormikProvider>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }
}));
