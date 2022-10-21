# Express-k8s-SQS

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://img.shields.io/github/workflow/status/joaocasarin/express-k8s-sqs/CI/main?style=flat-square)](https://github.com/joaocasarin/express-k8s-sqs/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/joaocasarin/express-k8s-sqs/main?style=flat-square)](https://coveralls.io/github/joaocasarin/express-k8s-sqs?branch=main)
[![Top Language](https://img.shields.io/github/languages/top/joaocasarin/express-k8s-sqs?style=flat-square)](https://github.com/joaocasarin/express-k8s-sqs)

The EkS project was built with the intent of showing people how a CRUD API using [TypeScript](https://www.typescriptlang.org/), [Express.js](https://expressjs.com/), [Jest](https://jestjs.io/), Loggers like [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan), and using developer-experience oritented tools would look like and how it should work.

Soon there will be a full configuration for Kubernetes, and the usage of SQS will be implemented as well.

## Tech Stack

**Server:** Node.js, TypeScript, Express.js, Helmet, Morgan, Winston, Prisma, Jest.js, ESBuild, SWC, ESLint, Prettier, Husky, Commitizen, Lint-Staged.

## Features

-   [x] Users C.R.U.D
-   [ ] Create Kubernetes cluster and deploy to it
-   [ ] Implement SQS

## API Reference

#### Get all users

```http
  GET /v1/users
```

#### Get user

```http
  GET /v1/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user to fetch |

#### Create user

```http
  POST /v1/users
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. E-mail of user   |
| `name`     | `string` | **Required**. Name of user     |
| `password` | `string` | **Required**. Password of user |

#### Update user

```http
  PUT /v1/users/?id=${id}
```

| Query Parameter | Type     | Description                        |
| :-------------- | :------- | :--------------------------------- |
| `id`            | `number` | **Required**. Id of user to update |

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Optional**. New e-mail of user   |
| `name`     | `string` | **Optional**. New name of user     |
| `password` | `string` | **Optional**. New password of user |

#### Delete user

```http
  DELETE /v1/users/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `number` | **Required**. Id of user to delete |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`DATABASE_URL: postgresql://<user>:<password>@localhost:5432/dev?schema=public`

`NODE_ENV: development`

`PORT: <port>`

`DATABASE_URL_TEST: postgresql://<user>:<password>@localhost:5432/test?schema=public`

`POSTGRES_USER: <user>`

`POSTGRES_PASSWORD: <password>`

`POSTGRES_PORT: <database_port>`

`PGADMIN_EMAIL: <pgadmin_email>`

`PGADMIN_PASSWORD: <pgadmin_password>`

`PGADMIN_PORT: <pgadmin_port>`

## Requirements

-   Docker 20.10.16+
-   Docker-compose 1.29.2+
-   Node v16.15.0+
-   NPM 8.7.0+
-   Yarn 1.22.19+
-   VSCode 1.72.2+

### VSCode Extensions

-   ESLint 2.2.2+
-   Prettier - Code formatter 9.9.0+
-   Prisma 4.4.0+
-   EditorConfig for VS Code 0.16.4+

## Installation

Clone the repository

```bash
git clone https://github.com/joaocasarin/express-k8s-sqs.git
```

Install with `yarn`

```bash
  cd express-k8s-sqs
  yarn install
```

## Run Locally

Start the local database

```bash
  yarn docker
```

Run the migrations

```bash
  yarn migrate deploy
```

Start the server

```bash
  yarn dev
```

## Build and run production version

First build the bundle

```bash
  yarn build
```

Set the `NODE_ENV` variable to `production` either on your `.env` file or in your system environment

Now run the generated bundle

```bash
  yarn start
```

## Running Tests

Run the test migrations

```bash
  yarn test:migrate
```

Run the tests

```bash
  yarn test
```

**PS.:** the coverage threshold is set to 80%.

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/joaocasarin/express-k8s-sqs/blob/main/CONTRIBUTING.md) for ways to get started.

## Feedback

If you have any feedback, please reach out to me at `devjoaocasarin@hotmail.com`.

## Authors

-   [@joaocasarin](https://www.github.com/joaocasarin)

## License

[MIT](https://choosealicense.com/licenses/mit/)
