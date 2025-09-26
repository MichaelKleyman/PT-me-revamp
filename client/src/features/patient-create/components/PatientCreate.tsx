import { useCreatePatient } from "@client/lib/api/practitioner/query";
import {
  DialogMultiStepForm,
  DialogMultiStepFormProps,
} from "@client/lib/components/dialog/DialogMultiStepForm";
import { useAppStore } from "@client/store";
import {
  useSelectLoggedInUser,
  useSelectPractice,
} from "@client/store/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type TPatientCreate = {
  openCreatePatient: boolean;
  onClickCreatePatient: () => void;
};

const defaultFormInfo = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  email: "",
};

export const PatientCreate = (props: TPatientCreate) => {
  const { openCreatePatient, onClickCreatePatient } = props;

  const loggedInUser = useAppStore(useSelectLoggedInUser);
  const practice = useAppStore(useSelectPractice);

  const practiceId = String(practice?.id);

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
    onClickCreatePatient();
  }, [
    createPatient,
    getValues,
    loggedInUser?.userType,
    onClickCreatePatient,
    practiceId,
  ]);

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

  // TODO: Implement the rest of the PatientCreate component logic (more steps)
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
    <DialogMultiStepForm
      fullWidth
      steps={steps}
      open={openCreatePatient}
      title="Create New Patient"
      onClose={() => onClickCreatePatient()}
      onSubmit={handleCreatePatient}
      disableSubmit={!formState.isValid}
    />
  );
};
