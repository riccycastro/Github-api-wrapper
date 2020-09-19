# cocus backend developer task

The purpose of this project is to allow the end client to get a Github account repositories and all current active branches from a unique endpoint call.
____

### Docker setup

First, make sure that you have [Docker] and [Docker-compose] installed in your machine.
Clone this repo, enter the project folder and run 

``` bash
    docker-compose up -d --build
```

This should be enough to have the app server up and running.

_Be aware that at the first time you start the server, it will install the project dependencies. It takes some seconds to complete_

After that you need to config the hostname. To do that just copy the contenct from the host file(./webserver/host) and append it to /etc/hosts

Now you can access the application here: http://api.cocus-backend.local/

_To make it easier, the application container have the port 3333 exposed to your local machine so you can access the application here: http://localhost:3333_

___
### Dockerless

First, you need to set some configurations manually. Clone the _.env.example_ and remove the example from the cloned one. Specify the __PORT__ and __HEADER_ACCEPT__ though they are not mandatory, the only required one is the __GIT_REPOSITORY_API_URL__

_Note: Env vars will override the .env file configurations_

Go to the application folder cocus-backend-developer-task/application and install the dependencies

``` bash
npm install
```

And start the application

``` bash
npm run start:dev
```

---
To run all tests
``` bash
    npm run test
```

E2E tests
``` bash
    npm run test:e2e
```

Unit tests
``` bash
    npm run test:unit
```
___
#### Lastly

Normally I would split the docker project from the application but for the sake of simplicity they are in the same project.


[Docker]: https://docs.docker.com/engine/install/ubuntu/
[Docker-compose]: https://docs.docker.com/compose/install/
