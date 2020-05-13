# UserLocation
PART I: Download & Build on local

(1) Clone the repository, install node packages 
git clone https://github.com/anhtramnguyen/UserLocation.git

cd UserLocation

npm install

node app.js

(2) Open your local browser and try accessing
https://localhost:3000/visit

PART II: Testing API endpoints

With a test tool, such as Advance Rest Client

POST {userId:"user1", name:"Disney"}
Returns:{visitId:"user1Disney<somenumber>}

GET /visit?visitId=user1Disney<somenumber>
Returns {userId:"user1", name:"Disney", vsistId:"user1Disney<somenumber>"}

GET /visit?userId=user1&searchString=Dis
Returns {userId:"user1", name:"Disney", vsistId:"user1Disney<somenumber>"}
