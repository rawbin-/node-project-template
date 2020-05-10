import { Injectable } from '@nestjs/common';
import { RABBITMQ_SERVICE } from './rabbitmq.constants';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitmqProvider = [{
  provide: RABBITMQ_SERVICE,
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        prefetchCount: 2,
        urls: ['amqp://admin:admin@localhost:5672/testvhost'],
        queue: 'testqueue'
      }
    })
  }
}]
