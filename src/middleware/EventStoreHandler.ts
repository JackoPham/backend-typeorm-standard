import {ExpressMiddlewareInterface, Body} from 'routing-controllers';
import MessageBus from '../Events/EventStore/MessageBus';

export class EventStoreHandler implements ExpressMiddlewareInterface { // interface implementation is optional
    use(request: any, response: any, next: (err?: any) => any): any {
        MessageBus.instance.save(request, response.statusCode);
        next();
    }
}
