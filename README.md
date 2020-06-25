RabbitMQ-Mysql-Restify example project
============================================

Setup environment
----------------------------------------
```
npm install
```

RabbitMQ install
-----------------------------------------
```
docker pull bitnami/rabbitmq:latest
```
RabbitMQ run
-----------------------------------------
```
docker run -d --name rabbitmq-server --network host bitnami/rabbitmq:latest
```

RabbitMQ test
-----------------------------------------
```
docker run -it --rm \
    --network host \
    bitnami/rabbitmq:latest rabbitmqctl -n rabbit@rabbitmq-server status
```

Mysql run
-------------------------------------------
```
docker run --name mysql --network host -v /home/ig/mysql-volume:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=orders_test -e MYSQL_USER=orders_test -e MYSQL_PASSWORD=orders_test \
-d mysql:latest
```

Mysql deploy prepared sql
--------------------------------------------
```
docker exec mysql sh -c 'exec mysqldump --all-databases -uroot -p"password"' > ./dockers/mysql/sql.sql
```