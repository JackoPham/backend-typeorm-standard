import {Entity, Column} from 'typeorm';
import BaseModel from '../model/common/interfaces/IBaseModel';
import {IsNotEmpty} from 'class-validator';
import * as moment from 'moment';

export class UserChangePassword {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    oldPassword: string;

    @Column()
    updatedDate: Date;

    constructor() {
        this.updatedDate = moment.utc().toDate();
    }
}
