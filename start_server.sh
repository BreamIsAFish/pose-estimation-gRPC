#!/bin/sh

# cd gRPC/
echo '''Starting grpc server...'''
python3 ./gRPC/gameServer.py &

echo '''Starting pose server...'''
node poseServer &
# echo '''Starting pose app...''' 
# ./node_modules/.bin/pm2 serve ./ 4200 --spa  &
# echo '''Starting game client...''' 
# python3 ./gRPC/gameClient.py &

echo '''Started
          - pose server
          - pose client
          - gRPC server'''