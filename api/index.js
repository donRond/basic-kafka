import { createServer } from 'node:http'
import { Kafka } from 'kafkajs';

const user = {
  id: 1, name: 'Ronald', lastname: 'Costa',
};

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();
await producer.connect();
createServer(async (request, response) => {
  if (request.url == '/kafka') {
    await producer.send({
      topic: 'user-topic',
      messages: [
        {
          value: JSON.stringify(user)
        }
      ]
    })
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify({ kafka: 'ok' }))
    response.end()
  }

})
  .listen(3000)
  .on('listening', _ => (console.log('server is running')));
