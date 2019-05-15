import { IClientOptions } from 'mqtt';
import fs from 'fs';

export interface ClientOptions extends IClientOptions {
    passphrase?: string;
    secureProtocol?: string;
}

export const mqttClientOptions: ClientOptions = {
    host: 'localhost',
    port: 1883,
    protocol: 'mqtt',
};

const options = {
    // encoding: 'UTF-8',
};

export const mqttsClientOptions: ClientOptions = {
    host: 'localhost',
    port: 8443,
    protocol: 'mqtts',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    passphrase: 'test',
    secureProtocol: 'TLSv1_method',
    reconnectPeriod: 5000,
    rejectUnauthorized: false,
    ca: [fs.readFileSync('keystore/ca/ca.crt', options)],
    key: fs.readFileSync('keystore/client/client.key', options),
    cert: fs.readFileSync('keystore/client/client.crt', options),
};

// console.log('ca', fs.readFileSync('keystore/ca/ca.crt', options));
// console.log('key', fs.readFileSync('keystore/client/client.key', options));
// console.log('cert', fs.readFileSync('keystore/client/client.crt', options));