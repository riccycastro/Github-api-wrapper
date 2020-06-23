# cocus backend developer task

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

[Docker]: https://docs.docker.com/engine/install/ubuntu/
[Docker-compose]: https://docs.docker.com/compose/install/


### Docker less
Go to the application folder cocus-backend-developer-task/application and install the dependencies

``` bash
npm install
```

to start the application just run

``` bash
npm run start:dev
```
