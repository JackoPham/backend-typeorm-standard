import {Middleware, ExpressErrorMiddlewareInterface} from 'routing-controllers';
import LogHelper from '../helpers/LogHelper';

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: any, res: any, next: (err?: any) => any) {
        if (error) {
            res.status(res.statusCode);
            res.send({error});
            let msgData = JSON.stringify(error);
            if (msgData !== '{}') {
                LogHelper.writeLog(`${req.method} ${req.originalUrl}\n${msgData}\n`);
            }
            else
                LogHelper.writeLog(`${req.method} ${req.originalUrl}\n${error.message}\n`);
        }
        res.end();
    }
}
