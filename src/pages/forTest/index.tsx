import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UploadFileInput from "../../components/UploadFileInput";
import { SelectWithFilteration } from "../../components/SelectWithFilteration";
import { StringParam, useQueryParam } from "use-query-params";
import { Paper, Stack, Typography, TextField, Button } from "@mui/material";
import Pusher from "pusher-js";
import { APP_CLUSTER, APP_KEY } from "../tenders/details/Chat/pusher.config";

function ForTest() {
  const [inputValue, setInputValue] = useState("");
  const [channel, setChannel] = useState("");
  const [eventData, setEventData] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (channel) {
      const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
      const pusherChannel = pusher.subscribe("channel-" + channel);

      pusherChannel.bind_global((res: unknown, hell: unknown) => {
        const jsoned = JSON.stringify(res);
        console.log(res, hell);
        setEventData([...eventData, jsoned]);
        enqueueSnackbar(jsoned);
      });
      return () => {
        pusher.disconnect();
      };
    }
  }, [channel]);

  return (
    <Stack>
      <Paper component={Stack} elevation={4} p={2} spacing={2}>
        <TextField
          label="Enter Channel Number"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setChannel(inputValue);
          }}
        >
          Update Channel
        </Button>
        <Typography variant="body1">Current Channel: {channel}</Typography>
        {eventData.map((data_item) => (
          <Typography variant="body2">- {data_item}</Typography>
        ))}
      </Paper>
    </Stack>
  );
}

export default ForTest;
