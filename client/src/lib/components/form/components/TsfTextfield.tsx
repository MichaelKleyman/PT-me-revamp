import { Stack, TextField, TextFieldProps } from "@mui/material";
import { useFieldContext } from "../contexts/formContext";
import { TsfFieldProps } from "../utils/types";

type TsfFieldBasicProps = TsfFieldProps<
  string,
  Omit<TextFieldProps, "type" | "error">
>;

export const TsfTextfield = (props: TsfFieldBasicProps) => {
  const { type, label, error, ...otherProps } = props;
  const field = useFieldContext<typeof props.type>();

  return (
    <Stack gap={0.5}>
      <TextField
        {...otherProps}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        fullWidth
      />
    </Stack>
  );
};
