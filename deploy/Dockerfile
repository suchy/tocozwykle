
# Based on https://hub.docker.com/r/denoland/deno

FROM denoland/deno:2.4.1

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y ca-certificates

RUN deno install --entrypoint ./app/main.ts

ENV DENO_DIR=/tmp/deno

EXPOSE 8000

CMD ["deno", "task", "server"]


