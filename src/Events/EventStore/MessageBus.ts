import EventRepository from './Repository/EventRepository';
import EventModel from './Models/EventModel';
import DataHelper from '../../helpers/DataHelper';
let uuid = require('node-uuid');
export default class MessageBus {
    private eventRepository:EventRepository;
    private _eventModel = new EventModel();
    private static _instance:MessageBus;
    constructor() {
        this.eventRepository = new EventRepository();
    }
    static get instance() {
        if (!MessageBus._instance)
            MessageBus._instance = new MessageBus();
        return MessageBus._instance;
    }
    save(req:any, statusCode:any) {
        let data = req.body || req.params || req.query || {};
        data.status = {
            statusCode: statusCode,
            method: req.method
        };
        this._eventModel.payload = data;
        this._eventModel.aggregateId = uuid();
        this._eventModel.aggregate = req.originalUrl;
        this._eventModel.context = DataHelper.getContext(req.originalUrl);
        this.eventRepository.save( this._eventModel);
    }
}

