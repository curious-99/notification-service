import { 
  producers, 
  consumers 
} from "../config/kafkaConfig.js";
import {
  sendWhatsAppMessages, 
  sendSMSMessages, 
  sendEmailNotification, 
  sendCallNotification, 
  sendPushNotification
}  from "./notificationService.js";

//TODO: ERROR HANDLING AND LOGGERS. JSON LOGGIN FOR NODEJS
const sendToKakfkaTopic = async (topic: string, notification: any) => {
  await producers.connect();
  console.log("Kafka producer connected");
  await producers.send({
    topic: topic,
    messages: [{value: JSON.stringify(notification)}]
  });
}

const handleNotification = async(notification:any) => {
  const {to, message} = notification;
  console.log('Notification:', notification);
  //TODO: CAN USE FACTORY DESIGN PATTERN. INTERFACE/BASE CLASS , OPEN/CLOSED PRINCIPLE
  //USE CONTANTS
  if(notification.type === 'email'){
    await sendEmailNotification(notification);
  } else if (notification.type === 'whatsapp') {
    await sendWhatsAppMessages(to, message);
  } else if (notification.type === 'sms'){
    await sendSMSMessages(to, message);
  } else if (notification.type === 'push'){
    await sendPushNotification(notification);
  } else if (notification.type === 'call'){
    await sendCallNotification(notification.to);
  }
};

const startLKafkaConsumer = async () => {
  await consumers.connect();
  console.log("Kafka consumer connected");
  console.log("Subscribing to topics");
  //TODO: DEPENDENCY IMPROVISE, SOLID PRINCIPLE CODE, CHECK FOR PARAMTERS FOR CONSUMERS AND PRODUCERS.
  await consumers.subscribe({ topic: "highly-critical" , fromBeginning: true }); 
  await consumers.subscribe({ topic: "critical", fromBeginning: true});
  await consumers.subscribe({ topic: "normal", fromBeginning:true});

  await consumers.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received message:")
      const notification = message.value ? JSON.parse(message.value.toString()) : null;
      console.log("Received notification in Consumer:", notification);
      await handleNotification(notification);
    },
  });
};

const startKafkaProducer = async ( flag: number,notification: any) => {
  console.log('Flag:', flag);
  let topic;
  if(flag === 2){
    topic = "highly-critical";
  } else if (flag === 1) {
    topic = "critical";
  } else {
    topic = "normal";
  }
  console.log('Topic:', topic);


  await sendToKakfkaTopic(topic, notification);
};

export { startLKafkaConsumer, startKafkaProducer };
