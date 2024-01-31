import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import UploadFileInput from "../../components/UploadFileInput";
import { SelectWithFilteration } from "../../components/SelectWithFilteration";
import { StringParam, useQueryParam } from "use-query-params";
import { Stack } from "@mui/material";
import "./index.css";
import { Map } from "./Leaflet/Map";

function ForTest() {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  // const [channel, setChannel] = useState("");
  // const [eventData, setEventData] = useState<string[]>([]);
  // const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (channel) {
  //     const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
  //     const pusherChannel = pusher.subscribe("channel-" + channel);

  //     pusherChannel.bind_global((res: unknown, hell: unknown) => {
  //       const jsoned = JSON.stringify(res);
  //       console.log(res, hell);
  //       setEventData([...eventData, jsoned]);
  //       enqueueSnackbar(jsoned);
  //     });
  //     return () => {
  //       pusher.disconnect();
  //     };
  //   }
  // }, [channel]);

  return (
    <Stack>
      <Map />
    </Stack>
  );
}

export default ForTest;
