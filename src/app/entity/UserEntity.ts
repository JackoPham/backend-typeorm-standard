import {Entity, Column, BaseEntity, ObjectIdColumn, CreateDateColumn, ObjectID} from 'typeorm';
import * as moment from 'moment';
import BaseModel from '../model/common/interfaces/IBaseModel';
import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
@Entity()
export class User extends BaseModel {
    @ObjectIdColumn()
    @Transform((id: Object) => id.toHexString(), {toPlainOnly: true})
    id: ObjectID;

    @Column()
    fullName: string;

    @Column()
    @IsNotEmpty()
    email:string;

    @Column()
    @IsNotEmpty()
    password:string;

    @Column({default: false})
    isActive: boolean;

    @Column()
    codeActive:string;

    @Column()
    avatar:string

    constructor() {
        super();
        this.createdDate = moment().utc().toDate();
        this.isActive = false;
        this.avatar = 'https://kenh14cdn.com/2017/photo-10-1506237342428.jpg';
    }
}
