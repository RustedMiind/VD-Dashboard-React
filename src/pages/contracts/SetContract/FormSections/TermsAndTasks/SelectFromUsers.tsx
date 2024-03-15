import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type userT = { id: number; name: string };
export default function ContractAddUsersSelect({
  users,
  setValue,
  disabled,
}: {
  disabled: boolean;
  users: userT[];
  setValue: React.Dispatch<React.SetStateAction<userT[]>>;
}) {
  return (
    <Stack spacing={3} sx={{ width: "100%", padding: "0.2rem" }}>
      <Autocomplete
        disabled={disabled}
        multiple
        id="tags-outlined"
        options={users}
        onChange={(e, newVal) => {
          console.log("SelectedValues", newVal);
          setValue(newVal);
          return "";
        }}
        getOptionLabel={(option) => option.name}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} placeholder="اضف مستخدم" />
        )}
      />
    </Stack>
  );
}
