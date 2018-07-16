import RabbitMQ from '../../system/RabbitMQ';
import UserBusiness from '../../app/business/UserBusiness';
import MessageBus from '../EventStore/MessageBus';
import {RabbitHelper} from './RabbitHelper';
let uuid = require('node-uuid');
class UserEvent {
    private amqp: any;
    init() {
        this.amqp = RabbitMQ.connection();
        this.amqp.then(conn => {
            this.createUser(conn);
            this.getUser(conn);
        });
    }

    createUser(conn) {
        conn.createChannel().then(function(ch) {
            // let ok = RabbitHelper.getRabbitOption(ch, 'create_user');
            // ok = ok.then(function(queue) {
            //     return ch.consume(queue, logMessage, {noAck: true});
            // });
            // async function logMessage(msg) {
            //     console.log('Data listener => ', msg.content.toString());
            //     let data = JSON.parse(msg.content);
            //     // MessageBus.instance.createUser(data);
            //     await UserBusiness.instance.create(data);
            //     ch.ack(msg);
            // }
            let q = 'rpc_queue';
            let ok = ch.assertQueue(q, {durable: false});
            ok = ok.then(function() {
                ch.prefetch(1);
                return ch.consume(q, reply);
            });
            // return ok.then(function() {
            //     console.log(' [x] Awaiting RPC requests');
            // });

            function reply(msg) {
                let n = msg.content.toString();
                console.info(n);
                let response = n;
                ch.sendToQueue(msg.properties.replyTo,
                    Buffer.from(response.toString()), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
            }
        });
    }
    getUser(conn) {
        conn.createChannel().then(function(ch) {
            let ok = RabbitHelper.getRabbitOption(ch, 'get_user');
            ok = ok.then(function(queue) {
                return ch.consume(queue, logMessage, {noAck: true});
            });
            async function logMessage(msg) {
                let data = await UserBusiness.instance.getList();
                console.log(' 3002 [x] \'%s\'', JSON.stringify(data));
            }
        });
    }
}
export default UserEvent;
