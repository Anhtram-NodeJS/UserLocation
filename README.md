A simple API that accepts user location webhooks and can be queried with a search string or a visit ID

This API exposes the following two endpoints:

1. POST /visit
  a. Accepts POST requests with ‘application/json’ types.
  b. The schema for submitted objects is as follows:
      1. userId - the user that is submitting the location
      2. name - the name of the location
  c. Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission
  
2. GET /visit

  a. Can be queried with either of the following patterns
     i. visitId
    ii. both of the following two query params:
        . userId 
        . searchString- A string which is attempted to be matched over the 5 most recent locations the user has visited.
           The matching should be fuzzy, and case insensitive.
           
  b. Returns an array of arrival objects that was submitted to the POST.

Errors are clearly handled and input are validated.
Service are secured with https.

Example timeline:

POST { userId: “user1”, name: “McDonald’s” } 
Returns: { visitId: “some-visit-id-1” }

GET /visit?visitId=some-visit-id-1
Returns: [{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]

POST { userId: “user1”, name: “Starbucks” }
Returns: { visitId: “some-visit-id-2” }

GET /visit?userId=user1&searchString=MCDONALD’S LAS VEGAS 
Returns: [{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]

POST { userId: “user2”, name: “Starbucks” } 
Returns: { visitId: “some-visit-id-3” }

GET /visit?userId=user2&searchString=APPLE 
Returns: []


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
Returns:{visitId:"user1Disney*somenumber*}


GET /visit?visitId=user1Disney*somenumber*
Returns {userId:"user1", name:"Disney", vsistId:"user1Disney*somenumber*"}

GET /visit?userId=user1&searchString=Dis
Returns {userId:"user1", name:"Disney", vsistId:"user1Disney*somenumber*"}
  
or from a browser:
https://localhost:3000/visit?visitId=user1Disney*somenumber*
  
  
