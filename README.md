# pose-estimation-gRPC (Pose estimation + communicate w/ python client using gRPC)

## How to use (Recommend using *Option 2*)


### Option 1: Manual Installation (High chance to go Boom Boom Bakudan!)

#### 1) Install dependencies

```
pip install -r requirements.txt
npm install
```

#### 2) Open 3 separate console

- console ที่ 1 เรียก 
```node poseServer```
 (middle server between js client and gRPC server)
 
- console ที่ 2 เรียก 
```python ./gRPC/gameServer.py```
 (python server)
 
- console ที่ 3 เรียก 
```python ./gRPC/gameClient.py```
 (python client)
 
 
#### 3) Run live server on vs-code (Draging the html file into the browser is not working.)

##### 1. Install "live server" extension on vs-code
##### 2. Click "Go Live" button on the bottom-right corner to start server.
 
(Do not use "server.js". It's still have "some" bugs.)

<hr />

### Option 2: Running w/ Docker (Recommended)

#### 1) Install & Open Docker Desktop

#### 2) You have 2 choices
 - If you want to run only **pose-estimation app** & **grpc-server**. Use </br>
 ```docker-compose up -d```
 - If you also want to run pose-estimation app & grpc-server & **game-client** . Use </br>
 ```docker-compose -f docker-compose-testing.yml up -d``` instead.
 
#### 3) Open pose-application
3.1) Go to your browser </br>
3.2) Go to url ```localhost:4200``` </br>
3.3) Allow browser to use your face cam </br>
3.4) Click on the video section </br>
3.5) Press ```P``` on your keyboard to start predicting </br>
(You can right click and press ```inspect``` to view the prediction result in the **console**)

#### 4) Open game-client to receive the prediction result from pose-application
If you chose to run ```docker-compose -f docker-compose-testing.yml up -d``` in step 2 </br>
You can open console in the **Docker Desktop** to view the prediction result and view the data transfer between pose-side & game-side


## All Pose Available
    1. left_hand_raised
    2. right_hand_raised
    3. tree
    4. warrior
    5. triangle
    6. x_pose
    7. squad
