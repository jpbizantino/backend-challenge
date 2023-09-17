<div align="center">
  <h1>Full Stack JS - Code Challenge - V3</h1>
  <p>Backend project crafted using Node, Express, Mocha/Chai for testing, Axios for HTTP requests, Winston for logging, DotEnv for environment configuration, and adhering to StandardJS coding standards.</p>  
</div>

## Quick Start Guide

### Using Docker:
- Run the following commands: 

    ``` 
    docker build . -t backend-challenge 
    docker run --rm -d -p 3000:3000/tcp backend-challenge:latest 
    ```

### Executing project:
- Install Node 14.x   (Project will only work on this version)    
- Run project

    ```     
    npm start
    ```

## About

- Author: Juan Pablo Bizantino
- Date: September 2023

## Frameworks & Libraries

- nodejs
- express
- mocha / chai / chai-http
- axios
- winston
- dotenv
- standard

## (Optional) Enviromental Variables

Note: Application will run with the default values unless you create a .env file

Create a .env file on root directory and fill it with the following variables. Set production variables

```
NODE_ENV=production
API_BASE =
API_TOKEN=
PORT=
```

## Initial Setup

1- Install modules:
```
npm install
```

2- Excecute the project:

- __Start project:__ 
```
npm start         
```

- __Run Mocha/Chai test:__ 
```
npm test          
```

- __Run project in dev mode:__ 
```
npm run dev
```
- __Run standardJS and fix code:__ 
```
npm run std
```

- __Show node version:__ 
```
npm run v
```

## Docker Image

Open console on your project directory and run the following command

```
docker build . -t backend-challenge 
```

Execute the image

``` 
docker run --rm -d -p 3000:3000/tcp backend-challenge:latest 
```
