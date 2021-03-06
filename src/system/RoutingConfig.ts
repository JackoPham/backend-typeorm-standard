import {useExpressServer} from 'routing-controllers';
import {NotFoundUrl} from '../middleware/NotFoundUrl';
import UserController from '../controllers/UserController';
import {CustomErrorHandler} from '../middleware/CustomErrorHandler';

export class RoutingConfig {
    static config() {
        let express = require('express'); // or you can import it if you have installed typings
        let app = express(); // your created express server
        // app.use() // you can configure it the way you want
        useExpressServer(app, {
            cors: true,
            defaultErrorHandler: false,
            routePrefix: '/api',
            defaults: {
                nullResultCode: 404,
                undefinedResultCode: 204,
                paramOptions: {
                    required: true
                }
            },
            middlewares: [
                NotFoundUrl,
                CustomErrorHandler
            ],
            controllers: [
                UserController
            ]
        });
        // const app = createExpressServer({
        //     cors: true,
        //     routePrefix: '/api',
        //     controllers: [
        //         SystemController
        //     ]
        // });
        return app;
    }
}
