import {UserRepository} from '../repository/UserRepository';
import {ErrorCommon} from '../model/common/Error';
import {getCustomRepository} from 'typeorm';
import {User} from '../entity/UserEntity';
import {Message} from '../model/common/Message';
import {UserChangePassword} from '../entity/UserChangePassword';
let jwt = require('jsonwebtoken');

class UserBusiness {
    private userRepository = getCustomRepository(UserRepository);
    private static _instance: UserBusiness;

    constructor() {
        // this.userRepository = new UserRepository();
    }
    static get instance() {
        if (!UserBusiness._instance)
            UserBusiness._instance = new UserBusiness();
        return UserBusiness._instance;
    }
    async getList(name?: string, page?: number, limit?: number): Promise<User[]> {
        let users = await this.userRepository.find();
        // let listUser:User[] = [];
        // for (let index = 0; index < 10; index++) {
        //     let item : any = {
        //         firstName: 'Kenry',
        //         lastName: 'Phyam ' + index
        //     };
        //     listUser.push(item);
        // }
        return users;
    }

    async create(data: User): Promise<Message> {
        try {
            let result = await this.userRepository.save(data);
            let msg = new Message(1, 'Crated user was success!');
            if (!result) {
                msg.id = -1;
                msg.message = 'Create user unsuccess!';
            }
            return msg;
        }
        catch (error) {
            throw new ErrorCommon(101, error);
        }
    }

    async login(data: User): Promise<any> {
        try {
            let user = await this.userRepository.findOne(
                {
                    where:
                    {
                        email: data.email, password: data.password, $and: [{isActive: {$exists: true}}, {isActive: {$eq: true}}]
                    }
                });
            if (user) {
                let userRes = {
                    email: user.email,
                    id: user.id.toHexString(),
                    fullNamel: user.fullName,
                    createDate: user.createdDate,
                    avatar: user.avatar,
                    role: {}
                };
                let token = jwt.sign(userRes, 'vnng-infotech-com-@#', {expiresIn: '1d'});
                let result = {
                    user: userRes,
                    token
                };
                return result;
            }
            return null;
        }
        catch (error) {
            throw new ErrorCommon(101, error);
        }
    }

    async changePassWord(data: UserChangePassword) {
        let user = await this.userRepository.findOne({
            where:
            {
                email: data.email, password: data.oldPassword, $and: [{isActive: {$exists: true}}, {isActive: {$eq: true}}]
            }
        });

        if (user) {
            user.password = data.password;
            this.userRepository.save(user);
        }
    }
}
export default UserBusiness;
