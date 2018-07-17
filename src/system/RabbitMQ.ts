const amqp = require('amqplib');
import Project from '../config/Project';

class RabbitMQ {
    private static rabbitCnn: any;
    private static amqpSettings = `amqp://${Project.RABBITMQ.USER}:${Project.RABBITMQ.PWD}@${Project.RABBITMQ.HOST}?heartbeat=10`;
    static connection() {
        return this.rabbitCnn;
    }
    static connect() {
        this.rabbitCnn = amqp.connect(this.amqpSettings);
    }
}

export default RabbitMQ;
