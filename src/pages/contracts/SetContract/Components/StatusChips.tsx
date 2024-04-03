import { Typography } from "@mui/material";

function GenerateStatusChip(props: PropsType): JSX.Element {
  let chip: JSX.Element = <></>;
  switch (props.statusId) {
    case -1:
      chip = (
        <Typography color="primary.main" variant="subtitle2">
          {props.contractStatus}
        </Typography>
      );
      break;
    case 0:
      chip = (
        <Typography color="error.main" variant="subtitle2">
          {props.contractStatus}
        </Typography>
      );
      break;
    case 1:
      chip = (
        <Typography color="warning.main" variant="subtitle2">
          {props.contractStatus}
        </Typography>
      );
      break;
    case 2:
      chip = (
        <Typography color="success.main" variant="subtitle2">
          {props.contractStatus}
        </Typography>
      );
      break;
    default:
      break;
  }
  return chip;
}

export default GenerateStatusChip;

type PropsType = { statusId: number; contractStatus: string | number };
