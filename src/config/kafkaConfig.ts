import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["0.0.0.0:9092"],
  connectionTimeout: 10000,
});

const producers = kafka.producer();
const consumers = kafka.consumer({ groupId: "notification-group" });
export { producers, consumers };