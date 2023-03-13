# ASLTranslateWeb
React app with TypeScript and Material UI for translating English to ASL videos

## Instructions (w/o Docker)
1. Install `nodejs` and `NPM` on local system
2. Open Root Directory and install all dependences with `npm install`,
3. Run `npm start`

## Instructions (w/ Docker)
### Build
`docker build -t asl-model-frontend .`

### Run
`docker run -it --rm -p 3000:3000 -e CHOKIDAR_USEPOLLING=true asl-model-frontend`