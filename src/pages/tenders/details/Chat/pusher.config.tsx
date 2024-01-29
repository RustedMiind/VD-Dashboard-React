// In a separate module, e.g., pusherConfig.js
import Pusher from "pusher-js";

export const APP_KEY = "88b7759ad02f3b5c4f16",
  APP_CLUSTER = "ap2";

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});

console.log(pusher);

export default pusher;
