import MessageBus from '../Events/EventStore/MessageBus';
import {Post, Get, Body, JsonController, UseAfter} from 'routing-controllers';
import UserBusiness from '../app/business/UserBusiness';
import {EventStoreHandler} from '../middleware/EventStoreHandler';
import {User} from '../app/entity/UserEntity';
import {UserChangePassword} from '../app/entity/UserChangePassword';

@JsonController("/user")
@UseAfter(EventStoreHandler)
class UserController {
    constructor() {
    }

    @Get("/test")
    async getUsers(req): Promise<any> {
        return 'Api working...';
    }

    @Post("/create")
    async create(@Body({validate:true}) user: User): Promise<any> {
        let data = await UserBusiness.instance.create(user);
        return data;
    }

    @Post("/login")
    async login(@Body({validate:true}) user: User): Promise<any> {
        let data = await UserBusiness.instance.login(user);
        return data;
    }

    @Post("/change-pass")
    async changePassword(@Body({validate:true}) user: UserChangePassword): Promise<any> {
        let data = await UserBusiness.instance.changePassWord(user);
        return data;
    }
}

Object.seal(UserController);
export default UserController;
