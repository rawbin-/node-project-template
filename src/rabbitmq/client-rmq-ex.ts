import { ClientRMQ } from '@nestjs/microservices';




export class ClientRMQEx extends ClientRMQ{
  public createChannelEx(msgHandler: Function): Promise<void> {
    return new Promise(resolve => {
      this.channel = this.client.createChannel({
        json: false,
        setup: (channel: any) => {
          return Promise.all([
            channel.assertQueue(this.queue, { durable: true }),
            channel.consume(this.queue, msgHandler),
            this.setupChannel(channel, resolve)
          ]);
        }
      });
    });
  }

  public
}
