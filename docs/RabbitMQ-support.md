# 使用步骤
-  安装docker
https://www.docker.com/get-started

## 启动Rabbitmq 
```
docker-compose up -d -f docker-config/docker-compose-rabbitmq.yml` 启动RabbitMQ
```

# 配置Rabbitmq 
- 打开 `http://localhost:15672` 用`admin:admin`
- 到`Admin` 标签 配置一个`vhost` `testvhost`
- 到`Queues`标签，给`testvhost` 配置一个 `queue` `testqueue`

# 启动项目
- `npm start` 
