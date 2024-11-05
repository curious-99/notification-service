import admin from 'firebase-admin';
import serviceAccountKey from './firebase-serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

export const fcm = admin.messaging();

export interface PushNotificationMessage {
  tokens: string[];
  title: string;
  body: string;
}

// Utility to create Push Notification message options
export const createPushNotificationMsgOptions = (
  tokens: string[],
  title: string,
  body: string
): PushNotificationMessage => {
  return {
    tokens,  
    title,   
    body,
  };
};




// // // Usage example for Push Notifications
// // export const triggerPushNotification = async (tokens: string[], title: string, body: string) => {
// //   const notificationOptions = createPushNotificationMsgOptions(tokens, title, body);
// //   await sendPushNotification(notificationOptions);
// // };