const eventstore = require('eventstore');
import Project from '../config/Project';

export default class EventStore {
    static es = new eventstore(); // eslint-disable-line 
    static connect() {
        this.es = eventstore(Project.eventStoreSettings());
        this.es.init(err => {
            console.info('storage init...');
        });
        this.es.on('connect', function() {
            console.log('connection to storage is success');
        });

        this.es.on('disconnect', function() {
            console.log('connection to storage is gone');
        });
    }
}
