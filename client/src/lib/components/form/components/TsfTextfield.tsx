import { Stack, TextField, TextFieldProps } from "@mui/material";
import { useFieldContext } from "../contexts/formContext";
import { TsfFieldProps } from "../utils/types";

type TsfFieldBasicProps<T extends string | number = string> = TsfFieldProps<
  T,
  Omit<TextFieldProps, "type" | "error" | "value" | "onChange">
>;

export const TsfTextfield = (props: TsfFieldBasicProps) => {
  const { label, type, ...otherProps } = props;
  const field = useFieldContext<string | number>();

  const isNumber = type === "number";
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      field.handleChange(Number(e.target.value));
    } else {
      field.handleChange(e.target.value);
    }
  };

  return (
    <Stack gap={0.5}>
      <TextField
        {...otherProps}
        label={label}
        type={isNumber ? "number" : "text"}
        value={field.state.value}
        onChange={handleChange}
        onBlur={field.handleBlur}
        fullWidth
        error={hasError}
      />
    </Stack>
  );
};
