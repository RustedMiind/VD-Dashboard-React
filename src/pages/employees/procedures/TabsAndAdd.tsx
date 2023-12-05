import { Box, Tab, Tabs, Button, Paper, Stack } from "@mui/material";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { requestsIds } from "./RequestsIds";
import LevelItem from "./LevelItem/LevelItem";
import { LoadingButton } from "@mui/lab";

function TabsAndAdd(props: PropsType) {
  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="space-between"
      flexDirection="row-reverse"
      flexWrap="wrap"
      alignItems="end"
    >
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 1 }}
        onClick={props.addLevel}
        disabled={props.disabled}
      >
        اضافة مرحلة جديدة
      </Button>

      <Tabs
        aria-label="basic tabs example"
        value={props.currentTab}
        onChange={(e, v) => {
          props.setCurrentTab(v);
        }}
      >
        {requestsIds.map((req) => (
          <Tab
            key={req.id}
            label={req.name}
            value={req.id}
            disabled={props.disabled}
          />
        ))}
      </Tabs>

      {/* <Paper sx={{ p: 2 }}>
        {endpointStatus === "loading" && (
          <Stack>
            <LevelsPlaceholder />
          </Stack>
        )}
        {endpointStatus === "error" && (
          <Stack>
            <Typography variant="h5" py={4} color="error" textAlign="center">
              حدث خطأ في تحميل المراحل, برجاء المحاولة مرة اخري
            </Typography>
          </Stack>
        )}
        {departments && (
          <Stack>
            {endpointStatus === "none" &&
              proceduce.levels.map((level, index, arr) => {
                const IS_LAST_ITEM = index === arr.length - 1;
                const MORE_THAN_ONE = arr.length > 1;
                return (
                  <LevelItem
                    key={level.id}
                    level={level}
                    updateLevel={updateLevel(index)}
                    name={`المرحلة ${index + 1}`}
                    onDelete={
                      IS_LAST_ITEM && MORE_THAN_ONE
                        ? () => {
                            removeLevel(index);
                          }
                        : undefined
                    }
                    departments={departments}
                  />
                );
              })}
          </Stack>
        )}
        <Stack mt={2} direction={"row-reverse"}>
          <LoadingButton
            sx={{ px: 4 }}
            variant="contained"
            onClick={submitData}
            loading={sendState === "sending"}
            disabled={endpointStatus !== "none"}
          >
            ارسال التعديلات
          </LoadingButton>
        </Stack>
      </Paper> */}
    </Box>
  );
}

type PropsType = {
  addLevel: () => void;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
};

export default TabsAndAdd;
