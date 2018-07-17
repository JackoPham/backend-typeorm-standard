import UserEvent from './UserEvent';

export default class SubscribeEvent {
    constructor() {
    }

    static init() {
        new UserEvent().init();
    }
}
