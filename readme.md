the ingress service runs a host on ticketing.com

this should be configured locally in:

Windows: C:\Windows\System32\drivers\etc\hosts

Mac: etc\hosts

add the following line:
127.0.0.1 ticketing.com

This project usese
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
