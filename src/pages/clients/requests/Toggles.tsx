import { Stack, Chip, Badge } from "@mui/material";
import { requestTypes } from "./RequestTypes";
import { CountType } from "../../../types/Count";

function RequestTypesToggles({ selected, setSelected, counts }: PropsType) {
  function setCurrent(value: number) {
    return () => {
      if (selected === value) setSelected(undefined);
      else setSelected(value);
    };
  }

  function findCount(type: number): CountType | undefined {
    const found = counts?.find((c) => c.type === type);
    return found;
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
      {requestTypes.map((chip, index) => {
        const current = selected === chip.value;
        const count = findCount(index + 1)?.count || 0;
        return (
          <Badge key={chip.name} badgeContent={count} max={19} color="error">
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
  counts: CountType[] | null;
};

export default RequestTypesToggles;
