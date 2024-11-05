import express, {Request, Response} from 'express';
import { startLKafkaConsumer } from './services/kafkaService.js';
import notificationRoutes from './routes/notificationRoutes.js';
import logger from "./utils/logger/logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 9999;

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message:any) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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
