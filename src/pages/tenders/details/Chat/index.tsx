import { Paper, Stack, Typography } from "@mui/material";
import Pusher from "pusher-js";

import { useContext, useEffect, useRef, useState } from "react";
import MessageComponent from "./Message";
import SendMeessageForm from "./SendMessageForm";
import { APP_CLUSTER, APP_KEY } from "./pusher.config";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { TenderDataContext } from "..";
import { Message } from "../../../../types/Message/Message";
import AttachmentMessage from "./AttachmentMessage";

Pusher.log = (msg) => {
  console.log(msg);
};

function Chat() {
  const { enqueueSnackbar } = useSnackbar();
  const { tender } = useContext(TenderDataContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchs, setFetchs] = useState(0);
  const [scrolls, setScrolls] = useState(0);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [scrolls]);

  function getMessages() {
    if (typeof tender === "object") {
      // setMessages([]);
      axios
        .get<{ message: Message[] }>(Api("employee/tender/chat/" + tender.id))
        .then(({ data }) => {
          setMessages(data.message);
          setFetchs(fetchs + 1);
          setScrolls(scrolls + 1);
        })
        .catch(() => {
          enqueueSnackbar("تعذر في تحميل الرسائل", { variant: "error" });
        });
    }
  }

  useEffect(() => {
    getMessages();
  }, [typeof tender === "object" ? tender.id : null]);

  useEffect(() => {
    if (typeof tender === "object") {
      const pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER });
      const channel = pusher.subscribe("channel-" + tender.id);
      channel.bind("event", function (data: unknown) {
        getMessages();
      });
      return () => {
        pusher.disconnect();
      };
    }
  }, [fetchs]);
  return typeof tender === "object" && !!tender.user_type?.length ? (
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
