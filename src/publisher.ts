import mqtt from 'mqtt';

import { mqttClientOptions, mqttsClientOptions } from './options';

const client = mqtt.connect(mqttsClientOptions);

client.on('connect', () => {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
    client.end();
});

client.on('error', (error) => {
    console.log(error);
});