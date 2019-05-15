# How to run it from src/openssl/bin?

// Create CA
openssl req -new -x509 -days 1024 -extensions v3_ca -keyout ../../../keystore/ca/ca.key -out ../../../keystore/ca/ca.crt -config ../openssl.cnf

// Verify CA
openssl x509 -text -in ../../../keystore/ca/ca.crt

// Create Server
openssl genrsa -des3 -out ../../../keystore/server/server.key 2048

openssl genrsa -out ../../../keystore/server/server.key 2048

openssl req -out server.csr -key ../../../keystore/server/server.key -new -config ../openssl.cnf

openssl x509 -req -in ../../../keystore/server/server.csr -CA ../../../keystore/ca/ca.crt -CAkey ../../../keystore/ca/ca.key -CAcreateserial -out ../../../keystore/server/server.crt -days 1024

// Create Client
openssl genrsa -des3 -out ../../../keystore/client/client.key 2048

openssl req -out ../../../keystore/client/client.csr -key ../../../keystore/client/client.key -new

openssl x509 -req -in ../../../keystore/client/client.csr -CA ../../../keystore/ca/ca.crt -CAkey ../../../keystore/ca/ca.key -CAcreateserial -out ../../../keystore/client/client.crt -days 1024

# Input value

TWO_LETTER_COUNTRY_CODE=KR
STATE_OR_PROVINCE=Gyeonggi-do
CITY=Seongnam-si
ORGANIZATION=NKIA
ORGANIZATIONAL_UNIT=AIOTION
COMMON_NAME=sgoh
EMAIL=sgoh@nkia.co.kr