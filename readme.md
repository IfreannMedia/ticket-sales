the ingress service runs a host on ticketing.com

this should be configured locally in:

Windows: C:\Windows\System32\drivers\etc\hosts

Mac: etc\hosts

add the following line:
127.0.0.1 ticketing.com

This project usese
- nodeJs (18.15.0)
- k8s
- docker
- skaffold
- express
- typescript

Commands for project setup and running

skaffold init

skaffold dev


Config files

skaffold.yaml contains the skaffold config

the skaffold manifests for k8s are contained in infra/k8s

Auth
The Dockerfile and .dockerignore contain the docker config

Database

project uses MongoDB and talks to it using Mongoose (eg auth/src/models/user.ts)



JWT session and cookie-session
this project uses JWT for session auth
it also uses cookie-session https://www.npmjs.com/package/cookie-session

Kubernetes Ingress

uses kubernetes ingress controller

we check for process.env.JWT_KEY in the app startup, so susbequent uses can be suffixed with an exlamation point 'process.env.JWT_KEY!' to appease typescript


Testing the app

This project uses Jest to test the app, tests can be run with 'npm run test'
Jest will start an in-memory copy of mongoDB, start the express app, fake requests with supertest, run assertions

testing uses jest, supertest, mobodb-memory-server

install test dependencies (only for local dev not for building out a prod version (so Dockerfile should run 'RUN npm install --omit=dev'))
npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server

'jest --watchall --no-cache' -> the no cache flag is to prevent issues using jest with typescript 

-- note on testing ---

A test is failing, you believe you solved the problem but the test failed:
- possible sporadic issue of jest or ts-jest not recognizing changes in a file
- in this case restart the testing

