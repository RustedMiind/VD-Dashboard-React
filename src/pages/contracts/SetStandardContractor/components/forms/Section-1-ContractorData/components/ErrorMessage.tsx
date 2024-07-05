import { Typography } from "@mui/material";

export default function ErrorMessage(props: PropsType) {
  if (!props.show) return <></>;

  return (
    <Typography variant="body2" fontSize={13} color={"error"}>
      {props.messgae}
    </Typography>
  );
}

type PropsType = {
  messgae: string;
  show: boolean;
};
