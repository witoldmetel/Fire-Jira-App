import { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

import { Button, Container, Typography, Theme, TextField, Stack, Alert, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

import { Page } from 'src/core/components';
import { createProject } from 'src/store/slices/project/thunks/create-project';
import { useDispatch, useSelector } from 'src/store/store';
import { getProjectState, resetState } from 'src/store/slices/project';

export const NewProjectSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  key: Yup.string().min(3).max(5).required('Key should be between 3 to 5 chars'),
  description: Yup.string().max(50)
});

type InitialValues = {
  name: string;
  key: string;
  description: string;

  afterSubmit?: string;
};

export default function NewProjectPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage } = useSelector(getProjectState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Project created successfully!', {
        variant: 'success',
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <Close />
          </IconButton>
        )
      });
    }

    if (isError) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      key: '',
      description: ''
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        await dispatch(createProject(values));

        resetForm();
        setSubmitting(false);
      } catch (error) {
        resetForm();
        setSubmitting(false);
        setErrors({ afterSubmit: error as string });
      }

      dispatch(resetState());
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, dirty, isSubmitting } = formik;

  const isSubmitDisabled = !values.name || !values.key || !dirty || !!Object.keys(errors).length || isSubmitting;

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
                    label="Project Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <Alert className={classes.infoBar} severity="info">
                    <strong>The Project Key becomes the prefix for tasks created within that Project</strong>
                  </Alert>
                  <TextField
                    fullWidth
                    type="text"
                    label="Project Key"
                    {...getFieldProps('key')}
                    error={Boolean(touched.key && errors.key)}
                    helperText={touched.key && errors.key}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    multiline
                    rows={5}
                  />
                </Stack>

                <Button size="large" type="submit" variant="contained" disabled={isSubmitDisabled}>
                  Create Project
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
    paddingBottom: theme.spacing(5),
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 40%, ${
      theme.palette.grey[300]
    } 100%)`,
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
  },
  infoBar: {
    marginBottom: theme.spacing(3)
  }
}));
