import * as express from 'express';
import * as http from 'http';
import * as cluster from 'cluster';
import * as os from 'os';
import Project from './config/Project';
import RabbitMQ from './system/RabbitMQ';
import EventStore from './system/EventStore';
import SubscribeEvent from './Events/RabbitMq/SubscribeEvent';
import {Database} from './system/Database';
import {RoutingConfig} from './system/RoutingConfig';
import './helpers/Prototype';
const debug = require('debug')('express-mongodb:server');

startEventSourcing();

if (process.env.SINGLE_THREAD) {
    createServer();
    console.log('\x1b[32m', `\nhttp://localhost${Project.PORT === 80 ? '' : ':' + Project.PORT}`, '\x1b[0m');
}
else {
    if (cluster.isMaster) {
        let numCPUs = os.cpus().length;
        console.log('\x1b[32m', `\n master: http://localhost${Project.PORT === 80 ? '' : ':' + Project.PORT}`, '\x1b[0m');
        // SubscribeEvent.init();

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
        console.log(`Master ${process.pid} is started`);
    }
    else {
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        createServer();
        console.log(`Worker ${process.pid} is started`);
    }
}

function createServer() {
    const app = RoutingConfig.config();
    return createHttpServer(app, Project.PORT);
}
function startEventSourcing() {
    Database.connect();
    // RabbitMQ.connect();
    EventStore.connect();
}
function createHttpServer(app: express.Express, port: number) {
    /**
     * Create HTTP server.
     */
    app.set('port', port);
    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);

    server.on('listening', () => {
        let addr = server.address();
        let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        debug('Listening on ' + bind);
    });

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen')
            throw error;

        let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        /* eslint-disable */
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
        /* eslint-enable */
    }
    return server;
}
