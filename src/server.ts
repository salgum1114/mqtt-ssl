import mosca from 'mosca';
import path from 'path';

const secureKey = path.join(__dirname, '../', '/keystore/server/server.key');
const secureCert = path.join(__dirname, '../', '/keystore/server/server.crt');

const settings = {
    port: 2883,
    logger: {
        name: "secure",
        level: 40,
    },
    // secure: {
    //     port: 8443,
    //     keyPath: secureKey,
    //     certPath: secureCert,
    // },
};

const server = new mosca.Server(settings, () => {
    console.log('Mosca server is up and running');
});

server.on('clientConnected', (client: mosca.Client) => {
    console.log('Client connected', client.id, new Date());
});

server.on('clientDisconnected', (client: mosca.Client) => {
    console.log('Client Disconnected:', client.id, new Date());
});

server.authenticate = (client, username, password, callback) => {
    const authorized = (username === 'test' && password.toString() === 'test');
    console.log(authorized);
    if (authorized)  {
        client.user = username;
        callback(null, authorized);
    }
};

server.authorizePublish = function(client, topic, payload, callback) {
    callback(null, client.user == topic.split('/')[1]);
}

server.on('published', (packet: mosca.Packet, client?: mosca.Client, callback?: () => void) => {
    console.log('Published', packet.payload, client && client.id, callback);
});
