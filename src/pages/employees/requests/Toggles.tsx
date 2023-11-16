import { Stack, Chip, Badge } from "@mui/material";
import { requestTypes } from "./RequestTypes";

function RequestTypesToggles({ selected, setSelected }: PropsType) {
  function setCurrent(value: number) {
    return () => {
      if (selected === value) setSelected(undefined);
      else setSelected(value);
    };
  }

  return (
    <Stack
      sx={{
        alignItems: "end",
        gap: 2,
        flexDirection: "row",
        mb: 1,
      }}
    >
      {requestTypes.map((chip) => {
        const current = selected === chip.value;

        return (
          <Badge key={chip.name} badgeContent={0} color="error">
            <Chip
              color="primary"
              onClick={setCurrent(chip.value)}
              variant={current ? "filled" : "outlined"}
              label={chip.name}
            />
          </Badge>
        );
      })}
    </Stack>
  );
}

type PropsType = {
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default RequestTypesToggles;
