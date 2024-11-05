import express from 'express';  
import notificationController from '../controllers/notificationController.js';
const router = express.Router();


router.get('/send', notificationController.sendNotification)
router.post('/send', notificationController.sendNotification);

export default router;