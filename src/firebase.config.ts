// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { Api } from "./constants";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-ixDuw-0qkJ6CDcFLyubcO9U9P_0D9hE",
  authDomain: "client-bece7.firebaseapp.com",
  projectId: "client-bece7",
  storageBucket: "client-bece7.appspot.com",
  messagingSenderId: "886609353005",
  appId: "1:886609353005:web:62d07332739c59fa315ba4",
  measurementId: "G-W05ZTXF6LN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission !== "granted") return;
  const token = await getToken(messaging, {
    vapidKey:
      "BH0h9QCr-9MVNwwBElRGdGRr4JmXUqFSrB4F-CAeec7PqGAZzL-NIR4UvV3n25dUbvabUPp0CJxXQX6fXVxW-jU",
  });
  console.log(token);
  axios
    .post(Api("employee/notification-token"), { token })
    .then(console.log)
    .catch(console.log);
};
