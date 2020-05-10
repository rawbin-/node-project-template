import { Injectable } from '@nestjs/common';
import {MessagePattern,Payload,Ctx,RmqContext} from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  @MessagePattern('*')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(originalMsg)

    channel.ack(originalMsg);
  }
}
