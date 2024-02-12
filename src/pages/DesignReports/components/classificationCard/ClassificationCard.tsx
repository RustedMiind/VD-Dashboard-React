import { Button, ButtonProps, Typography } from "@mui/material";

function ClassificationCard({
  count,
  isCurrentTab,
  setThisTab,
  title,
  ...buttonProps
}: PropsType & ButtonProps) {
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid priimary.main",
        width: 350,
        height: 90,
      }}
      variant={isCurrentTab ? "contained" : "outlined"}
      onClick={setThisTab}
      {...buttonProps}
    >
      <Typography variant="h6" fontWeight={700} fontSize={14}>
        {title}
      </Typography>
      <Typography
        sx={{
          color: !isCurrentTab ? "secondary.main" : "primary.contrastText",
        }}
        fontWeight={700}
      >
        {count}
      </Typography>
    </Button>
  );
}

type PropsType = {
  title: string;
  count?: number;
  isCurrentTab: boolean;
  setThisTab: () => void;
};
export default ClassificationCard;
