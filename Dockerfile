FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y etherwake && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/wowo"]
COPY ./wowo /usr/bin/wowo
