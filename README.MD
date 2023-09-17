# Full Stack JS - Code Challenge - V3

## Quick Start Guide

### Using Docker:
- Run the following commands: 

    ``` 
    docker build . -t backend-challange 
    docker run --rm -d -p 3000:3000/tcp backend-challange:latest 
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
docker build . -t backend-challange 
```

Execute the image

``` 
docker run --rm -d -p 3000:3000/tcp backend-challange:latest 
```
