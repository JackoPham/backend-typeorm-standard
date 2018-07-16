import UserModel from '../../model/user/UserModel';

interface IUserBusiness{
    getList(name?: string, page?: number, limit?: number): Promise<UserModel[]>;
    create(data: any): Promise<UserModel | undefined>;
}

export default IUserBusiness;
