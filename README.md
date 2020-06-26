## A simple API that accepts user location webhooks and can be queried with a search string or a visit ID

#### This API exposes the following two endpoints:

1. POST /visit
	- Accepts POST requests with ‘application/json’ types.
	- The schema for submitted objects is as follows:
		1. userId - the user that is submitting the location
		2. name - the name of the location
	- Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission  
2. GET /visit
	- Can be queried with either of the following patterns
		1. `visitId`
		2. both of the following two query params:
			- `userId` 
			- `searchString` - A string which is attempted to be matched over the 5 most recent locations the user has visited. The matching should be fuzzy, and case insensitive.
	- Returns an array of arrival objects that was submitted to the POST.

#### Additional Features:
- Errors are clearly handled and input are validated.
- Service are secured with https.

#### Example timeline:
|Command| Return|
|---|---|
|POST { userId: “user1”, name: “McDonald’s” }| { visitId: “some-visit-id-1” }|
|GET /visit?visitId=some-visit-id-1 |[{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]|
|POST { userId: “user1”, name: “Starbucks” } | { visitId: “some-visit-id-2” }|
|GET /visit?userId=user1&searchString=MCDONALD’S LAS VEGAS | [{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]|
|POST { userId: “user2”, name: “Starbucks” } | { visitId: “some-visit-id-3” } |
|GET /visit?userId=user2&searchString=APPLE | []|


## UserLocation
##### PART I: Download & Build on local

1. Clone the repository, install node packages 

`$ git clone https://github.com/anhtramnguyen/UserLocation.git`

`$ cd UserLocation`

`$ npm install`

`$ node app.js`

2. Open your local browser and try accessing https://localhost:3000/visit

##### PART II: Testing API endpoints

With a test tool, such as Chrome Advance Rest Client, try running:

|Command| Expected Return|
|---|---|
|POST {userId:"user1", name:"Disney"}| {visitId:"user1Disney*somenumber*}|
|GET /visit?visitId=user1Disney*somenumber* |{userId:"user1", name:"Disney", vsistId:"user1Disney*somenumber*"}|
|GET /visit?userId=user1&searchString=Dis|{userId:"user1", name:"Disney", vsistId:"user1Disney*somenumber*"}|
  
or from a browser:
https://localhost:3000/visit?visitId=user1Disney*somenumber*
  
  
