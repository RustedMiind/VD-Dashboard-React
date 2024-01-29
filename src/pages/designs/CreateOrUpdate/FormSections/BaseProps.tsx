import { UseFormRegister } from "react-hook-form";
import { CreateFormType } from "..";

export interface FormSectionProps {
  registerFn: UseFormRegister<CreateFormType>;
}
