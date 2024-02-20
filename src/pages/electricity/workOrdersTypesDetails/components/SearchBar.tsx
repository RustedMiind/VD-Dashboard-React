import { Stack, TextField, Button, InputAdornment } from "@mui/material";

function SearchBar(props: PropsType) {
  return (
    <>
      <Stack
        direction="row"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        gap={1}
        sx={{
          button: { px: 4 },
          position: "relative",
          marginY: "1rem",
        }}
      >
        <TextField
          label="أسم المهمة"
          value={props.mission}
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            props.setMission(e.target.value);
          }}
        />
        <TextField
          label="أسم العمل"
          value={props.workName}
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            props.setWorkName(e.target.value);
          }}
        />
        <Button
          variant="contained"
          type={"button"}
          onClick={() => props.getData()}
        >
          بحث
        </Button>
      </Stack>
    </>
  );
}

type PropsType = {
  mission: string;
  workName: string;
  setMission: React.Dispatch<React.SetStateAction<string>>;
  setWorkName: React.Dispatch<React.SetStateAction<string>>;
  getData: () => void;
};

export default SearchBar;
