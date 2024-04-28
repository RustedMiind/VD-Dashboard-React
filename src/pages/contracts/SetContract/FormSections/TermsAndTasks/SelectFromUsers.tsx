import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

type userT = { id: number; full_name: string };
export default function ContractAddUsersSelect({
  users,
  setValue,
  disabled,
  selectedUsers,
}: {
  disabled: boolean;
  users: userT[];
  selectedUsers: userT[];
  setValue: React.Dispatch<React.SetStateAction<userT[]>>;
}) {
  return (
    <Autocomplete
      disabled={disabled}
      multiple
      id="tags-outlined"
      options={users}
      onChange={(e, newVal) => {
        setValue(newVal);
        return "";
      }}
      value={selectedUsers}
      getOptionLabel={(option) => option.full_name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} placeholder="اضف مستخدم" />
      )}
    />
  );
}
