# Connect Me

## Install

Run one of the following commands:

- `pnpm i`
- `yarn`
- `npm i`

## How to run

1. Make sure to have ports 3000 (front) and 3001 (back) open and available
2. Open two terminals (works best if you split them)
3. In one run `pnpm run server` _replace pnpm with your pmanager of choice_
4. Other one run `pnpm start`

### Decisions

1. plain css modules. I prefered to used this option because it keeps the bundle smaller and design decisions more free.
2. humble json server. In real world scenario I would have a monorepo for the front and the back. With a script in the backed that would build the front and then copy the build folder to the backend and deploy only the backend:
   `"scripts": {
    <!-- ... other scripts ... -->
    "build:ui": "rm -rf build && cd ../path-from-backend-to-frontend && npm run build && cp -r build ../path-to-the-backend-again",
    "deploy": "host/cloud provider of choice deploy command -- this would only deploy the back",
    "deploy:full": "npm run build:ui && npm run lint && npm run deploy",
}`
