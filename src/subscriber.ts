import mqtt from 'mqtt';

import { mqttClientOptions, mqttsClientOptions } from './options';

const client = mqtt.connect(mqttsClientOptions);

client.on('connect', () => {
    client.subscribe('presence');
});

client.on('message', (topic, message) => {
    console.log(topic, message);
    client.end();
});

client.on('error', (error) => {
    console.log(error);
});