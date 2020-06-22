FROM node:10.16.3-stretch

COPY ./entrypoint.sh /

RUN apt-get update
RUN apt-get install nano

RUN ["chmod", "+x", "/entrypoint.sh"]

ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /usr/src/app/cocus-backend-application

RUN npm i -g @nestjs/cli

# Create a group and user
RUN groupadd appgroup && useradd -ms /bin/bash appuser &&  usermod -a -G appgroup appuser

RUN chown -R appuser:appgroup /usr/src/app

# Tell docker that all future commands should run as the appuser user
USER appuser

EXPOSE 3333
