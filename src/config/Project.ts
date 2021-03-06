class Default {
    static HOST: string = 'localhost';
    static PORT: number = 5001;
    static PORT_CACHING: number = 3000;
    static PROJECT_NAME: string = 'Kenry nice';
    static AUTHENTICATION_EXPIRES: number = 15; // Days
}

interface IProject {
    HOST: string;
    PORT: number;
    PORT_CACHING: number;
    PROJECT_NAME: string;
    AUTHENTICATION_EXPIRES: number;

    DATABASES: [{
        NAME: string,
        HOST: string,
        PORT: number,
        DB_NAME: string,
        USERNAME: string,
        PASSWORD: string
    }];

    RABBITMQ: {
        HOST: string,
        USER: string,
        PWD: string
    };

    eventStoreSettings: any;

    SMTP: {
        AUTHENTICATOR: {
            USERNAME: string,
            PASSWORD: string
        },
        SENDER: {
            NAME: string,
            EMAIL: string
        }
    };
}

class Project {
    static getConfiguration() {
        // Get the current config
        let envConfig = require(`./env/${process.env.NODE_ENV}`);
        let config = {
            ...Default,
            ...envConfig.default
        };
        return config;
    }
}

Object.seal(Project);
export default <IProject>Project.getConfiguration();
