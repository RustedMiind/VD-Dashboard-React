import { Stack, Chip, Badge } from "@mui/material";
import { requestTypes } from "./RequestTypes";

function RequestTypesToggles({ selected, setSelected }: PropsType) {
  console.log(selected);

  function toggleSelected(toggle: string) {
    const instance = [...selected];
    const index = instance.findIndex((chip) => chip === toggle);

    if (index === -1) {
      const chipIndex = requestTypes.findIndex((chip) => chip.name === toggle);
      instance.push(requestTypes[chipIndex].name);
      setSelected(instance);
    } else {
      instance.splice(index, 1);
      setSelected(instance);
    }
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
        const found = selected.includes(chip.name);

        return (
          <Badge key={chip.name} badgeContent={0} color="error">
            <Chip
              color="primary"
              onClick={() => {
                toggleSelected(chip.name);
              }}
              variant={found ? "filled" : "outlined"}
              label={chip.name}
            />
          </Badge>
        );
      })}
    </Stack>
  );
}

type PropsType = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default RequestTypesToggles;
