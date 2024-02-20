import { NotificationPayload } from "firebase/messaging";

const HAS_NOTIFICATION_IN_BROWSER = "Notification" in window;

export function notify({ body, icon, image, title }: NotificationPayload) {
  if (!HAS_NOTIFICATION_IN_BROWSER) return;
  if (Notification.permission === "granted") {
    const notification = new Notification(title || "", {
      body,
      badge: image,
    });
    return notification;
  }
}

export function requestPermission(
  cb: (permission: NotificationPermission) => {}
) {
  if (!HAS_NOTIFICATION_IN_BROWSER) return;
  Notification.requestPermission().then(cb);
}
