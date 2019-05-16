import { IClientOptions } from 'mqtt';
import fs from 'fs';

export interface ClientOptions extends IClientOptions {
    passphrase?: string;
    secureProtocol?: string;
}

export interface MoscaLogger {
    name?: string;
    level?: number | string;
}

export interface MoscaSecure {
    port?: number;
    keyPath?: string;
    certPath?: string;
}

export interface MoscaSettings {
    port: number;
    logger?: MoscaLogger;
    secure?: MoscaSecure;
}

export const mqttClientOptions: ClientOptions = {
    host: 'localhost',
    port: 2883,
    protocol: 'mqtt',
    connectTimeout: 10 * 1000,
};

export const mqttsClientOptions: ClientOptions = {
    host: 'localhost',
    port: 8443,
    protocol: 'mqtts',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    secureProtocol: 'TLSv1_method',
    reconnectPeriod: 5 * 1000,
    rejectUnauthorized: false,
    connectTimeout: 10 * 1000,
    ca: [fs.readFileSync('keystore/ca/ca.crt')],
    key: fs.readFileSync('keystore/client/client.key'),
    cert: fs.readFileSync('keystore/client/client.crt'),
};

export const moscaSettings: MoscaSettings = {
    port: 2883,
    logger: {
        name: "secure",
        level: 40,
    },
    secure: {
        port: 8443,
        keyPath: 'keystore/server/server.key',
        certPath: 'keystore/server/server.crt',
    },
};
