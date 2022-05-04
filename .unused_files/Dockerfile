FROM ubuntu:latest

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

# COPY requirements.txt /requirements.txt
COPY ./gRPC/proto /proto
COPY ./gRPC/gameClient.py /gameClient.py

RUN apt-get update \
  && apt-get install -y python3-pip python3
# && cd /usr/local/bin \
# && ln -s /usr/bin/python3 python \
# && pip3 install --upgrade pip
# RUN pip3 install Requests Pygments

# RUN python3 -m pip freeze > requirements.txt
RUN pip install grpcio grpcio-tools google protobuf

# RUN pip3 install --no-c.ache-dir -r requirements.txt

EXPOSE 5001

ENTRYPOINT ["python3", "/gameClient.py"]