import { useFormik, Form, FormikProvider } from 'formik';

import { Grid, Button, Container, Typography, Theme, TextField, Stack, Alert } from '@mui/material';
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
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            Map
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  content: {
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left'
    }
  },
  overlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  backgroundImage: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '48vh'
    }
  },
  card: {
    padding: theme.spacing(2)
  },
  avatar: {
    width: '100%',
    borderRadius: theme.shape.borderRadiusMd
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  logoIcon: {
    width: 20,
    height: 20
  },
  textSecondary: {
    color: theme.palette.text.secondary
  },
  logo: {
    width: 32,
    height: 32
  },
  stackTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  stack: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  projectLink: {
    marginTop: theme.spacing(5)
  }
}));
