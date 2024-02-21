import { Paper, Stack, Typography } from "@mui/material";
import Pusher from "pusher-js";

import { useContext, useEffect, useRef, useState } from "react";
import MessageComponent from "./Message";
import SendMeessageForm from "./SendMessageForm";
import { APP_CLUSTER, APP_KEY } from "./pusher.config";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { Message } from "../../../../types/Message/Message";
import { SoilDataContext } from "..";
import { useLocation, useParams } from "react-router-dom";

Pusher.log = (msg) => {
  console.log(msg);
};

function Chat() {
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatStatus, setChatStatus] = useState<"auth" | "no_auth">("no_auth");
  const [fetchs, setFetchs] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const { soilData } = useContext(SoilDataContext);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isDiffChat = pathname.includes("showtask");
  const { id } = useParams();

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [scrolls]);

  function getMessages() {
    if (typeof soilData === "object") {
      // setMessages([]);
      axios
        .get<{ message: Message[] }>(
          Api("employee/soil/chat/" + (isDiffChat ? soilData.id : id))
        )
        .then(({ data }) => {
          setMessages(data.message);
          setFetchs(fetchs + 1);
          setScrolls(scrolls + 1);
          setChatStatus("auth");
        })
        .catch((err) => {
          if (err?.response?.status === 403) {
            // enqueueSnackbar("ليس لديك الصلاحية لتحميل المحادثة", {
            //   variant: "error",
            // });
          } else {
            enqueueSnackbar("تعذر في تحميل الرسائل", { variant: "error" });
          }
        });
    }
  }

  useEffect(() => {
    getMessages();
  }, [typeof soilData === "object" ? soilData.id : null]);

  useEffect(() => {
    if (typeof soilData === "object") {
      const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
      const channelPath = "channel-soil-" + (isDiffChat ? soilData.id : id);
      const channel = pusher.subscribe(channelPath);
      console.log(channelPath);
      channel.bind_global((ff: unknown) => {
        console.log(ff);
      });
      channel.bind("event", function (data: unknown) {
        getMessages();
      });
      return () => {
        pusher.disconnect();
      };
    }
  }, [fetchs]);
  return typeof soilData === "object" && chatStatus === "auth" ? (
    <Stack component={Paper} p={1} spacing={1}>
      <Paper sx={{ bgcolor: "Background", p: 2 }}>
        <Typography variant="h6">مدونة المحادثة والمهام</Typography>
      </Paper>
      <Stack
        ref={chatContainerRef}
        spacing={2}
        p={1}
        sx={{ maxHeight: { sm: 350, lg: 450 }, overflowY: "scroll" }}
      >
        {messages.map((message) => (
          <MessageComponent message={message} />
        ))}
      </Stack>
      <SendMeessageForm getMessages={getMessages} />
    </Stack>
  ) : (
    <></>
  );
}

export default Chat;
