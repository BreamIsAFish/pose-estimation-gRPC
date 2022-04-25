# pose-estimation-gRPC (Pose estimation + Chat system using gRPC)

## How to use

### 1) Install dependencies

```
pip install -r requirements.txt
npm install
```

### 2) Open 3 separate console

- console ที่ 1 เรียก 
```node poseServer```
 (middle server between js client and gRPC server)
 
- console ที่ 2 เรียก 
```python ./gRPC/gameServer.py```
 (python server)
 
- console ที่ 3 เรียก 
```python ./gRPC/gameClient.py```
 (python client)
 
 
### 3) Run live server on vs-code (Draging the html file into the browser is not working.)

#### 1. Install "live server" extension on vs-code
#### 2. Click "Go Live" button on the bottom-right corner to start server.
 
(Do not use "server.js". It's still have "some" bugs.)


Pose detection 
    1. left_hand_raised
    2. right_hand_raised
    3. tree
    4. warrior
    5. triangle
    6. x_pose
    7. squad
// Action name
// 1. left_hand_raised
// 2. right_hand_raised
// 3. tree
// 4. warrior
// 5. triangle
// 6. x_pose
// 7. squad