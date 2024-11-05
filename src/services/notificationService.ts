import {sendEmail} from "../config/emailConfig.js";
import { 
  client, 
  createSMSMsgOptions, 
  createWhatsAppMsgOptions,
  createCallOptions
} from '../config/twillioConfig.js';
import { 
  fcm,
  createPushNotificationMsgOptions,
  PushNotificationMessage 
} from "../config/firebaseConfig/firebaseConfig.js";

//WhatsApp notification
export const sendWhatsAppMessages = async (toNumbers: string[], messageBody: string) => {
  try {
    console.log('toNumbers:', toNumbers, 'messageBody:', messageBody);
    const sendMessages = toNumbers.map(async (phoneNumber: string) => {
      const msgOptions = createWhatsAppMsgOptions(phoneNumber, messageBody);
      const message = await client.messages.create(msgOptions);
      console.log(`WhatsApp message sent successfully to ${phoneNumber}:`, message.body);
    });

    await Promise.all(sendMessages); 
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
  }
};

//SMS notification 
export const sendSMSMessages = async (toNumbers: string[], messageBody: string) => {
  try {
    const sendMessages = toNumbers.map(async (phoneNumber: string) => {
      const msgOptions = createSMSMsgOptions(phoneNumber, messageBody);
      const message = await client.messages.create(msgOptions);
      console.log(`SMS sent successfully to ${phoneNumber}:`, message.body);
    });

    await Promise.all(sendMessages); 
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};

//Email notification
export const sendEmailNotification = async(notification:any) => {
  const {to, subject, message} = notification;
  try {
    await sendEmail(to, subject, message);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

//Push Notification
export const sendPushNotification = async(notification:PushNotificationMessage): Promise<void> => {
  const {tokens, title, body} = notification;
  const notificationOptions = createPushNotificationMsgOptions(tokens, title, body);

  try{
    const response = await fcm.sendEachForMulticast(notificationOptions);
    console.log(`Push Notification: ${response.successCount} send succesfully, ${response.failureCount} failed!`);
     
    //Handling Failures:
    if(response.failureCount > 0){
      let failedTokens:any = [];
      response.responses.forEach((resp, idx) => {
        if(!resp.success){
          failedTokens.push(tokens[idx]);
        }
      })
      console.log(`Failed Sending Push Notification to: `, failedTokens);
    }
  } catch(error){
    console.error(`Error Sending Notifications: `, error);
  }
}

//Call Notifications
export const sendCallNotification = async(toNumber: string) => {
  try {
    const callOptions = createCallOptions(toNumber);
    const call = await client.calls.create(callOptions);
    console.log(call.sid, "Voice Call Alert");
  } catch (error) {
    console.error("Failed to make a call", error);
  }
}

