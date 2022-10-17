FROM node:16.14-buster-slim

RUN apt update && apt install curl git -y

WORKDIR /app

RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*


# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "serve"]
