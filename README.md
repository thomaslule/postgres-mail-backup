# postgres-mail-backup

A docker image that is scheduled to backup a postgres database and send the export file to a mail address.

## Usage example

Docker-compose usage example:

```yaml
version: "3"
services:
  postgres:
    image: postgres:12.2-alpine
    environment:
      POSTGRES_PASSWORD: admin
      PGDATA: /data/postgres
    volumes:
      - postgres_data:/data/postgres

  postgres-backup:
    image: thomaslule/postgres-mail-backup:latest
    depends_on:
      - postgres
    environment:
      MAILBACKUP_DB_CONNECTION_STRING: postgresql://postgres:admin@postgres:5432/postgres
      MAILBACKUP_CRON_SCHEDULE: "0 5 * * 0"
      MAILBACKUP_SMTP_CONFIG: '{"host":"smtp.gmail.com","auth":{"user":"some-garbage-account@gmail.com","pass":"its password"}}'
      MAILBACKUP_FROM_MAIL: some-garbage-account@gmail.com
      MAILBACKUP_TO_MAIL: yourmail@address.com

  volumes:
    postgres_data:
```

For a simple usage without any encryption from a gmail address, you'll have to enable "less secure apps" on the sender account: https://myaccount.google.com/lesssecureapps?pli=1

## Environment variables

### `MAILBACKUP_DB_CONNECTION_STRING`

The connection string for your postgres database.

- required: false
- default: `postgresql://postgres:admin@localhost:5432/postgres`

### `MAILBACKUP_CRON_SCHEDULE`

The CRON expression that describes when the export must be done.

- required: false
- default: `0 5 * * 0` (every sunday at 05:00)

### `MAILBACKUP_SMTP_CONFIG`

A JSON-encoded string describing the SMTP configuration for [NodeMailer](https://nodemailer.com/about/). This will be passed as first argument of its `createTransport` function. See the doc [here](https://nodemailer.com/smtp/).

- required: true

### `MAILBACKUP_FROM_MAIL`

The sender mail address.

- required: true

### `MAILBACKUP_TO_MAIL`

The recipient mail address.

- required: true
