import { Module } from '@nestjs/common';
import { rabbitmqProvider } from './rabbitmq.provider';


@Module({
  imports: [],
  providers: [...rabbitmqProvider]
})

export class RabbitmqModule { }
