#!/bin/sh

# NODE_ENV=production node dist/apps/tuto-real-backend/main.js &
# cd gRPC/
# echo '''Starting game server...'''
# python3 ./gRPC/gameServer.py &

# cd ../
# echo '''Starting pose server...'''
# node poseServer &
echo '''Starting pose app...''' 
./node_modules/.bin/pm2 serve ./ 4200 --spa  &

echo '''Started
          - pose server
          - pose client
          - gRPC server'''
# cd ../../../