import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RABBITMQ_SERVICE } from './rabbitmq/rabbitmq.constants';
import {rabbitmqProvider} from './rabbitmq/rabbitmq.provider';
import { ClientRMQEx } from './rabbitmq/client-rmq-ex';

@Module({
  imports: [RabbitmqModule],
  controllers: [AppController],
  providers: [AppService, ...rabbitmqProvider,ClientRMQEx],
})
export class AppModule {}
