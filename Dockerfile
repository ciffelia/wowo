FROM scratch
ENTRYPOINT ["/usr/bin/wowo"]
COPY ./wowo /usr/bin/wowo
