# Podcaster

Minimal podcast listening app using React TypeScript and Webpack

## Project Structure

```
.
├── __mocks__
├── cypress
├── public
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── utils
│   ├── index.css
│   └── index.tsx
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrignore
├── .prettierrc.js
├── cypress.config.js
├── jest.config.js
├── jest.setup.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## Prerequisites (recommended)

1. Install [Node.js](https://nodejs.org/) v19.9.0 or greater.
2. Install [pnpm](https://pnpm.io/) as package manager.

## Getting Started

1. Clone repository and navigate to the folder.
2. Install dependencies by running the `pnpm install` command in the root directory.
3. Start the dev server: `pnpm run dev` command.


## Available scripts

`pnpm run start` - Alias for `pnpm run dev`

`pnpm run dev` - Run app in development mode

`pnpm run build` - Build app for production

`pnpm run lint` - Run linter

`pnpm run lint:fix` - Run linter and fix issues

`pnpm run test` - Run tests

`pnpm run test:watch` - Run tests in watch mode

`pnpm run test:coverage` - Run tests and generate coverage report

`pnpm run test:update` - Run tests and update the snapshots

`pnpm run cypress` - Run app in development mode and open cypress for testing

`pnpm run cypress:run` - Run app in development mode and run cypress tests in headless mode