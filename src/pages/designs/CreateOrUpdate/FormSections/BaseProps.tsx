import { UseFormRegister } from "react-hook-form";
import { CreateFormKeys, CreateFormType } from "..";
import { TextFieldProps } from "@mui/material";

export interface FormSectionProps {
  // registerFn: UseFormRegister<CreateFormType>;
  registerFn: (key: CreateFormKeys) => () => TextFieldProps;
}
