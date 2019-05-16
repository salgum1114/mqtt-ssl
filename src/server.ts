import mosca from 'mosca';

import { moscaSettings } from './options';

const server = new mosca.Server(moscaSettings, () => {
    console.log('Mosca server is up and running');
});

server.on('clientConnected', (client: mosca.Client) => {
    console.log('Client connected', client.id, new Date());
});

server.on('clientDisconnected', (client: mosca.Client) => {
    console.log('Client Disconnected:', client.id, new Date());
});

server.on('published', (packet: mosca.Packet, client?: mosca.Client, callback?: () => void) => {
    console.log('Published', packet.payload, client && client.id, callback);
});
