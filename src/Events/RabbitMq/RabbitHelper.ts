export class RabbitHelper {
    static getRabbitOption(ch:any, ex:any) {
        let ok = ch.assertExchange(ex, 'fanout', {durable: false});
        ok = ok.then(function() {
            return ch.assertQueue('', {exclusive: true});
        });
        ok = ok.then(function(qok) {
            return ch.bindQueue(qok.queue, ex, '').then(function() {
                return qok.queue;
            });
        });
        return ok;
    }
}
