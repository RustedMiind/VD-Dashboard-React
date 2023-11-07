import { Stack, Chip, Badge } from "@mui/material";
import { useState } from "react";

function RequestTypesToggles() {
  const chips: ChipType[] = [
    {
      name: "اجازات",
      count: 4,
    },
    {
      name: "مهام عمل",
      count: 1,
    },
    {
      name: "سلف",
      count: 5,
    },
    {
      name: "عهد",
      count: 5,
    },
    {
      name: "احتياجات عمل",
      count: 0,
    },
    {
      name: "صيانة سيارة",
      count: 0,
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  console.log(selected);

  function toggleSelected(toggle: string) {
    const instance = [...selected];
    const index = instance.findIndex((chip) => chip === toggle);

    if (index === -1) {
      const chipIndex = chips.findIndex((chip) => chip.name === toggle);
      instance.push(chips[chipIndex].name);
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
      {chips.map((chip) => {
        const found = selected.includes(chip.name);

        return (
          <Badge key={chip.name} badgeContent={chip.count} color="error">
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

type ChipType = {
  name: string;
  count: number;
};

export default RequestTypesToggles;
