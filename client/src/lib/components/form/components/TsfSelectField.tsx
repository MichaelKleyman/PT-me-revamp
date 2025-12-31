import {
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useFieldContext } from "../contexts/formContext";

type TsfSelectFieldProps = {
  label: string;
  defaultSelect?: string | null;
  defaultOptions?: string[];
};

export const TsfSelectField = (props: TsfSelectFieldProps) => {
  const { label, defaultSelect, defaultOptions } = props;

  const field = useFieldContext<string>();
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  console.log({ defaultSelect });

  return (
    <FormControl fullWidth size="small" error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={field.state.value}
        label={label}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {defaultSelect?.length ? (
          <MenuItem value="default">Use Default ({defaultSelect})</MenuItem>
        ) : null}
        {defaultOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {hasError && (
        <FormHelperText>{field.state.meta.errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
};
