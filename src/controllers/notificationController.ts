import { Request, Response } from 'express';
import { startKafkaProducer } from '../services/kafkaService.js';

// const notificationController = {
//     sendNotification: async (req: Request, res: Response) => {
//         const { flag, type, toNumbers, message } = req.body;
//         const notification = {type, message};
    
//         try{
//           await startKafkaProducer(flag, notification);
//           res.status(200).send("Notification sent successfully");
//         }
//         catch(err){
//           res.status(500).send("Error sending notification");
//         }
//     },
// };

// const notificationController = {
//   sendNotification: async (req: Request, res: Response) => {
//       const { 
//         flag, 
//         type, 
//         toNumbers,
//         message 
//       } = {
//         flag: 2, 
//         // type: 'email', 
//         // toNumbers:"mohit39.ugcs20@iiitranchi.ac.in", 
//         // type: 'whatsapp',
//         // toNumbers: ["+919588162649", "+919871118992"],  
//         type: 'call',
//         toNumbers: ["+919588162649", "+919353219497"],
//         message: 'Hello, there notification'
//       };
//       console.log('flag:', flag, 'type:', type, 'toNumbers:', toNumbers, 'message:', message);
//       const notification = {type, to:toNumbers, message};
  
//       try{
//         await startKafkaProducer(flag, notification);
//         res.status(200).send("Notification sent successfully");
//       }
//       catch(err){
//         console.log(err)
//         res.status(500).send("Error sending notification");
//       }
//   },
// };


const notificationController = {
  sendNotification: async (req: Request, res: Response) => {
      const { 
        flag, 
        type, 
        toNumber,
        message 
      } = {
        flag: 2, 
        type: 'call',
        toNumber: "+919588162649",
        message: 'Hello, there notification'
      };
      console.log('flag:', flag, 'type:', type, 'toNumber:', toNumber, 'message:', message);
      const notification = {type, to: toNumber, message};
  
      try{
        await startKafkaProducer(flag, notification);
        res.status(200).send("Notification sent successfully");
      }
      catch(err){
        console.log(err)
        res.status(500).send("Error sending notification");
      }
  },
};

export default notificationController;
