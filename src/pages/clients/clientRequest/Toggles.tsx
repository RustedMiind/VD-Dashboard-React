import React from "react";
import { CountType } from "../../../types/Count";
import { Badge, Chip, Stack } from "@mui/material";
import { OrderType } from "../clientsProcess/types/OrderType";
import { ActionTypes } from "./Filter/reducer";
import NonRoundedChip from "../../../components/NonRoundedChip";

const RequestTypesToggles = ({
  selected,
  setSelected,
  counts,
  orderType,
  dispatch,
  orderTypeId,
}: PropsType) => {
  const setCurrent = (value: number) => {
    return () => {
      if (selected === value) setSelected(undefined);
      else {
        setSelected(value);
        dispatch({ type: "SET_ORDER_TYPE", payload: value });
      }
    };
  };

  const findCount = (type: number): CountType | undefined => {
    const found = counts?.find((c) => c.type === type);
    return found;
  };
  return (
    <Stack
      sx={{
        alignItems: "end",
        gap: 2,
        flexDirection: "row",
        mb: 1,
      }}
    >
      <Badge max={19} color="error">
        <NonRoundedChip
          color="primary"
          onClick={setCurrent(0)}
          variant={orderTypeId === 0 ? "filled" : "outlined"}
          label={"الكل"}
        />
      </Badge>
      {orderType?.map((chip, index) => {
        const count = findCount(index + 1)?.count || 0;
        return (
          <Badge key={chip.name} badgeContent={count} max={19} color="error">
            <NonRoundedChip
              color="primary"
              onClick={setCurrent(chip.id)}
              variant={orderTypeId === chip.id ? "filled" : "outlined"}
              label={chip.name}
            />
          </Badge>
        );
      })}
    </Stack>
  );
};

type PropsType = {
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  counts: CountType[] | null;
  orderType?: OrderType[] | null;
  orderTypeId: number;
  dispatch: React.Dispatch<ActionTypes>;
};

export default RequestTypesToggles;
