# Production deployment

## Setup

First, modify the files `nginx.prod443.conf` and `nginx.prod80.conf`, replacing `DOMAIN_NAME` with your domain (e.g., example.com).

Generate a password hash with [BCrypt](https://bcrypt.online/) and replace it in the `.htpasswd` file in place of `PASSWORD_HASH`:

```
admin:PASSWORD_HASH
```

Then, modify the `docker-compose.yml` with the database passwords for the **database**, **cms-api**, and **openmu-startup** containers. Also, change the `ADMIN_PANEL_PASSWORD` variable to the password you set in the `.htpasswd` file.

In your domain service, create A records for the **admin** and **api** subdomains.

```
A	admin	0	<your-ip>	14400
A	api	0	<your-ip>	14400
```

Next, set all env variables needed for `client/.env`, **VITE_API_URL** must be equal to **https://api.DOMAIN_NAME**. And create `app.key` and `app.pub` for `server` and put it on `server/src/main/resources/` ([tutorial for creating](https://www.scottbrady91.com/openssl/creating-rsa-keys-using-openssl)).

Finally, start the containers:

```bash
docker compose up -d
```

And run certbot changing DOMAIN_NAME with your domain name:

```bash
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d DOMAIN_NAME -d www.DOMAIN_NAME -d api.DOMAIN_NAME -d admin.DOMAIN_NAME
```

## Running in a ARM environment

If you are running in a ARM environment, replace the `Dockerfile` of the `client` with the `Dockerfile.arm.client` file (renaming it to just Dockerfile) and do the same for the `server` with the `Dockerfile.arm.server` file.
