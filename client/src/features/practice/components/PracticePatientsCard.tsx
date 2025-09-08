import {
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import {
  DialogMultiStepForm,
  DialogMultiStepFormProps,
} from "@client/lib/components/dialog/DialogMultiStepForm";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@client/store";
import {
  useSelectLoggedInUser,
  useSelectPractice,
} from "@client/store/selectors";
import {
  useCreatePatient,
  useGetAllPatients,
} from "@client/lib/api/practitioner/query";

const defaultFormInfo = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  email: "",
};

export const PracticePatientsCard = () => {
  const [openCreatePatient, setOpenCreatePatient] = useState(false);

  const loggedInUser = useAppStore(useSelectLoggedInUser);
  const practice = useAppStore(useSelectPractice);

  const practiceId = String(practice?.id);

  const { data: patients } = useGetAllPatients(practiceId);
  const { mutateAsync: createPatient } = useCreatePatient();

  const schema = z.object({
    firstName: z.string().min(1, "Must provide the first name of the patient"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Must provide the last name of the patient"),
    address: z.string().min(1, "Must provide the adress of the patient"),
    email: z.string().email("Must provide a valid email address"),
  });

  const resolver = zodResolver(schema);

  const { control, formState, trigger, getValues } = useForm({
    defaultValues: defaultFormInfo,
    resolver,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleCreatePatient = useCallback(() => {
    const formValues = getValues();
    const userType = loggedInUser?.userType;

    if (!userType) return;
    createPatient({ ...formValues, practiceId, userType });
    setOpenCreatePatient(false);
  }, [createPatient, getValues, loggedInUser?.userType, practiceId]);

  const onClickCreatePatient = useCallback(() => {
    setOpenCreatePatient((prev) => !prev);
  }, []);

  const renderAddressInput = (
    <Controller
      name="address"
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          placeholder="Patient Address"
          label="Type Patient Address"
          error={Boolean(formState.errors.address)}
          fullWidth
          helperText={
            formState.errors.address ? formState.errors.address.message : ""
          }
          {...field}
        />
      )}
    />
  );

  const renderEmailInput = (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          placeholder="Patient email"
          label="Type Patient Email"
          error={Boolean(formState.errors.email)}
          fullWidth
          helperText={
            formState.errors.email ? formState.errors.email.message : ""
          }
          {...field}
        />
      )}
    />
  );

  const renderFirstNameInput = (
    <Controller
      name="firstName"
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          placeholder="Patient first name"
          label="Type Patient First Name"
          error={Boolean(formState.errors.firstName)}
          fullWidth
          helperText={
            formState.errors.firstName ? formState.errors.firstName.message : ""
          }
          {...field}
        />
      )}
    />
  );

  const renderLastNameInput = (
    <Controller
      name="lastName"
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          placeholder="Patient last name"
          label="Type Patient Last Name"
          error={Boolean(formState.errors.lastName)}
          fullWidth
          helperText={
            formState.errors.lastName ? formState.errors.lastName.message : ""
          }
          {...field}
        />
      )}
    />
  );

  const renderMiddleNameInput = (
    <Controller
      name="middleName"
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          placeholder="Patient middle name"
          label="Type Patient Middle Name"
          error={Boolean(formState.errors.middleName)}
          fullWidth
          helperText={
            formState.errors.middleName
              ? formState.errors.middleName.message
              : ""
          }
          {...field}
        />
      )}
    />
  );

  const renderStep1 = (
    <Stack flexDirection="column" gap={2}>
      <Stack flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        {renderFirstNameInput}
        {renderMiddleNameInput}
        {renderLastNameInput}
      </Stack>
      {renderEmailInput}
      {renderAddressInput}
    </Stack>
  );

  const steps: DialogMultiStepFormProps["steps"] = [
    {
      label: "Patient Details",
      render: renderStep1,
      onValidate: () => trigger(["firstName", "lastName", "email", "address"]),
    },
  ];

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 3, height: "100%" }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
            Total Patients
          </Typography>
          <Tooltip title="Create Patient">
            <span>
              <IconButton onClick={onClickCreatePatient}>
                <AddIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
        <Typography variant="h3">{patients?.length}</Typography>
      </Paper>
      <DialogMultiStepForm
        fullWidth
        steps={steps}
        open={openCreatePatient}
        title="Create New Patient"
        onClose={() => setOpenCreatePatient(false)}
        onSubmit={handleCreatePatient}
        disableSubmit={!formState.isValid}
      />
    </Grid>
  );
};
