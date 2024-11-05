import express, {Request, Response} from 'express';
import { startLKafkaConsumer } from './services/kafkaService.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
const port = process.env.PORT || 9999;

app.use(express.json());
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.send('Hello Service-Notification 2');
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    //TODO: Recovery and failure case handling along with safe closing and deallocation of all memory.  
    await startLKafkaConsumer().catch(error => console.log("Error starting Kafka consumer", error));
});

export default app;
