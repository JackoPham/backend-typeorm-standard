import EventModel from '../Models/EventModel';
import EventStore from '../../../system/EventStore';
export default class EventRepository {
    save(data: EventModel) {
        EventStore.es.getEventStream({
            aggregateId: data.aggregateId,
            aggregate: data.aggregate, // optional
            context: data.context // optional
        }, function(err, stream) {
            stream.addEvent(data.payload);
            stream.commit((commitErr, stream) => {
                if (commitErr)
                    console.error(commitErr);
                else
                    console.log('Event was saved');
            });
        });
    }
}
