#!/usr/bin/env bash
composer install
mkdir -p config/jwt
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -pass pass:A813Jkjasnvndu23
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout -passin pass:A813Jkjasnvndu23

php bin/console doctrine:migrations:migrate --no-interaction
php bin/console make:admin