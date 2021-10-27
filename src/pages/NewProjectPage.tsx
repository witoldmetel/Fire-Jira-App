import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

import { Button, Container, Typography, Theme, TextField, Stack, Alert, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

import { Page } from 'src/core/components';

export const NewProjectSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().min(20).required('Message is required')
});

type InitialValues = {
  name: string;
  email: string;
  subject: string;
  message: string;

  afterSubmit?: string;
};

export default function NewProjectPage() {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        // SIMULATE SENDING MESSAGE BECAUSE FIREBASE CLOUD FUNCTIONS ARE NOT FREE ANYMORE :(
        // @todo: Try Lambda AWS
        await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          enqueueSnackbar('Message sent successfully!', {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <Close />
              </IconButton>
            )
          });
          resetForm();
          setSubmitting(false);
        });
      } catch (error) {
        resetForm();
        setSubmitting(false);
        setErrors({ afterSubmit: error as string });
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  return (
    <Page className={classes.root} title="New Project | Fire Jira">
      <Container>
        <div className={classes.content}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <Stack spacing={5}>
                <Typography variant="h3">Project Creator</Typography>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Subject"
                    {...getFieldProps('subject')}
                    error={Boolean(touched.subject && errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />

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
                </Stack>

                <Button size="large" type="submit" variant="contained" disabled={!dirty || isSubmitting}>
                  Send Now
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }
}));
