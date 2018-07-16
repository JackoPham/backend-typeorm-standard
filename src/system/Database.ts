import {getConnectionOptions, createConnection} from 'typeorm';
import Project from '../config/Project';
import {ConnectionOpenOptions} from 'mongoose';
import {MongoConnectionOptions} from 'typeorm/driver/mongodb/MongoConnectionOptions';

export class Database {
    static async connect() {
        let db = Project.DATABASES.find(db => db.NAME === 'default')!;
        const dbconfig : MongoConnectionOptions = {
            'type': 'mongodb',
            'host': db.HOST,
            'port': db.PORT,
            'username': db.USERNAME,
            'password': db.PASSWORD,
            'database': db.DB_NAME,
            'synchronize': true,
            'logging': true,
            'logger': 'file',
            'autoReconnect': true,
            'entities': [
                'dest/app/entity/*.js'
            ],
            'cli': {
                'entitiesDir': 'dest/app/entity'
            }
        };
        // read connection options from ormconfig file (or ENV variables)
        // const connectionOptions = await getConnectionOptions();
        // create a connection using modified connection options
        await createConnection(dbconfig).then(connection => {
            console.info('Database is connected');
        }).catch(error => {
            console.error(error);
        });
    }
}
