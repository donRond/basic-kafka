import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'kafka',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'user-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'user-topic' });

await consumer.run({
  autoCommit: true,
  eachMessage: async ({ message }) => {
    console.log({ user: JSON.parse(message.value.toString()) })
  }

})
