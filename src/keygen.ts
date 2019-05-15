import { execSync, ExecSyncOptions } from 'child_process';
import path from 'path';

type Status = 'all' | 'ca' | 'server' | 'client';

const argsLength = process.argv.length;
let status: Status = 'all';
if (argsLength > 2) {
    status = process.argv.slice(2)[0] as Status;
}

const opensslPath = 'openssl/bin/openssl';
const opensslConfPath = `openssl/openssl.cnf`;
const binPath = path.resolve(__dirname, opensslPath)
const confPath = path.resolve(__dirname, opensslConfPath);
const execSyncOption: ExecSyncOptions = {
    stdio: 'inherit',
}

/**
 * Create CA
 */
const caKeystorePath = 'keystore/ca';
const caKeyPath = `${caKeystorePath}/ca.key`;
const caCrtPath = `${caKeystorePath}/ca.crt`;
if (status === 'all' || status === 'ca') {
    execSync(`${binPath} req -new -x509 -days 1024 -extensions v3_ca -keyout ${caKeyPath} -out ${caCrtPath} -config ${confPath}`, execSyncOption);
}

/**
 * Create server key
 */
const serverKeystorePath = 'keystore/server';
const serverKeyPath = `${serverKeystorePath}/server.key`;
const serverCsrPath =  `${serverKeystorePath}/server.csr`;
const serverCrtPath = `${serverKeystorePath}/server.crt`;
if (status === 'all' || status === 'server') {
    execSync(`${binPath} genrsa -des3 -out ${serverKeyPath} 2048`, execSyncOption);
    execSync(`${binPath} genrsa -out ${serverKeyPath} 2048`, execSyncOption);
    execSync(`${binPath} req -out ${serverCsrPath} -key ${serverKeyPath} -new -config ${confPath}`, execSyncOption);
    execSync(`${binPath} x509 -req -in ${serverCsrPath} -CA ${caCrtPath} -CAkey ${caKeyPath} -CAcreateserial -out ${serverCrtPath} -days 1024`, execSyncOption);
}

/**
 * Create client key
 */
const clientKeystorePath = 'keystore/client';
const clientKeyPath = `${clientKeystorePath}/client.key`;
const clientCsrPath = `${clientKeystorePath}/client.csr`;
const clientCrtPath = `${clientKeystorePath}/client.crt`;
if (status === 'all' || status === 'client') {
    execSync(`${binPath} genrsa -des3 -out ${clientKeyPath} 2048`, execSyncOption);
    execSync(`${binPath} req -out ${clientCsrPath} -key ${clientKeyPath} -new -config ${confPath}`, execSyncOption);
    execSync(`${binPath} x509 -req -in ${clientCsrPath} -CA ${caCrtPath} -CAkey ${caKeyPath} -CAcreateserial -out ${clientCrtPath} -days 1024`, execSyncOption);
}