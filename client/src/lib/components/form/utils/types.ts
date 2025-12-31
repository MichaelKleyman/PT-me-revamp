import { Replace } from "@client/lib/types/types";

export type FieldProps<T, OtherProps = unknown> = {
  value: T | null | undefined;
  onChange: (value: T | null | undefined) => void;
  label?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
} & OtherProps;

export type TsfFieldProps<T, OtherProps = unknown> = {
  /** The type field serves only as a type guard */
  type: T | null | undefined;
} & Replace<
  FieldProps<T, OtherProps>,
  { onChange?: T | null | undefined; value?: T | null | undefined }
>;
