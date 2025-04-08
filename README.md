# expressplate

An Express.js REST API opinionated boilerplate designed for building scalable and maintainable web applications. Pre-configured environment with TypeScript, Express.js, and great VS Code integration.

- Strict ESLint TypeScript linting and automatic formatting with zero additional configuration needed.
- VS Code settings bundled with the boilerplate, including recommended extensions for automatic formatting - via a one-click install.

## Features

### Core technologies

- TypeScript with strict typing rules
- Express.js REST API setup
- Environment variable validation and configuration

### Logging

- Winston & Morgan for robust logging
- Log rotation with daily files
- Separate error logs
- Console logging overrides for consistent formatting

### Code quality

- ESLint v9 with strict configuration:
    - typescript-eslint for full TypeScript integration
    - Prettier plugin for formatting
    - Import & unused imports detection
    - Security plugin
    - Vitest support
- VS Code settings, including ESLint set up as a formatter with Prettier integration - **formatting & quick fixes in one pass**!
- Prettier integrated with ESLint
- Husky pre-commit hooks
- .editorconfig for consistent code style across different editors

### Testing

- Vitest testing framework

## Getting started

To get started with `expressplate`, clone the repository and install dependencies:

```bash
git clone https://github.com/Tenemo/expressplate.git
cd expressplate
npm install
```

### Configuration

    ```bash
    cp .env.sample .env
    ```

Create the .env file in the root directory and adjust the variables as needed.

### Development

To start the development server with nodemon:

```bash
npm run dev
```

### Build

To compile TypeScript to JavaScript and build the project for production:

```bash
npm run build
```

### Deployment

Deploy the built application by starting the server with:

```bash
npm start
```

This will run the compiled JavaScript code from the `dist` directory.

### Running tests

To run tests using Vitest:

```bash
npm test
```

### Code quality

Lint your code and fix formatting issues:

```bash
npm run lint:fix
```

## API Routes

- `GET /api/health-check` - Check service health

## Logging

Logs are configured to rotate daily with separate files for combined logs and error logs. Check the `logs` directory for:

- `combined-[DATE].log` - All logs including HTTP requests
- `error-[DATE].log` - Error logs only

## License

This project is licensed under the MIT License.
