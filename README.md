# mqtt-ssl

This project started to test mqtt, mqtts.
openssl allows you to generate private keys and certificates for CA, Server, and Client.
> openssl is included as a binary in this project and can be generated with the `npm run keygen` command.

# How can I start testing?

How to use simple.

1. npm run keygen -> Generates private keys and certificates for CA, Server, and Client.
```
It can also be created individually.
- npm run keygen:ca
- npm run keygen:server
- npm run keygen:client
```
2. npm start -> Run to MQTT Server (Broker).
3. npm run sub -> Run to MQTT Client (Subscriber).
4. npm run pub -> Run to MQTT Client (Publisher).

# Where is the generated key?

The root path for this project resides in the keystore directory, in the ca, server, and client subdirectories, respectively.

# How to change openssl configuration?

You can change openssl.cnf in src/openssl/openssl.cnf.

# How to change server and client options?

You can change client and server options in src/options.ts.

You can set options for `MQTT` and `MQTTS`.

# How to run it from src/openssl/bin?

**Create CA**
```
openssl req -new -x509 -days 1024 -extensions v3_ca -keyout ../../../keystore/ca/ca.key -out ../../../keystore/ca/ca.crt -config ../openssl.cnf
```

**Verify CA**
```
openssl x509 -text -in ../../../keystore/ca/ca.crt
```

**Create Server**
```
openssl genrsa -des3 -out ../../../keystore/server/server.key 2048

openssl genrsa -out ../../../keystore/server/server.key 2048

openssl req -out server.csr -key ../../../keystore/server/server.key -new -config ../openssl.cnf

openssl x509 -req -in ../../../keystore/server/server.csr -CA ../../../keystore/ca/ca.crt -CAkey ../../../keystore/ca/ca.key -CAcreateserial -out ../../../keystore/server/server.crt -days 1024
```

**Create Client**
```
openssl genrsa -des3 -out ../../../keystore/client/client.key 2048

openssl req -out ../../../keystore/client/client.csr -key ../../../keystore/client/client.key -new

openssl x509 -req -in ../../../keystore/client/client.csr -CA ../../../keystore/ca/ca.crt -CAkey ../../../keystore/ca/ca.key -CAcreateserial -out ../../../keystore/client/client.crt -days 1024
```

# Example input when generating keys with openssl.

Country Name (2 letter code)=KR

State or Province Name (full name)=Gyeonggi-do

Locality Name (eg, city)=Seongnam-si

Organization Name (eg, company)=NKIA

Organizational Unit Name (eg, section)=AIOTION

Common Name (eg, YOUR hostname or domain)=salgum1114

Email Address=salgum1112@gmail.com