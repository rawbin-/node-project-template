import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientRMQEx } from './rabbitmq/client-rmq-ex';
import { RABBITMQ_SERVICE } from './rabbitmq/rabbitmq.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(RABBITMQ_SERVICE) private readonly mqClient: ClientRMQEx) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  async onApplicationBootstrap(){
    const client = this.mqClient
    const connection = await client.connect().catch(error => {
      console.log('mq connection error:',error)
    })

    const channel = await client.createChannel((msg) => {
        console.log('get message:', msg)
    }).catch(error => {
      console.log('mq consume  error:',error)
    })

  }
}
