# Simple Backend with Create, Update & Count Apis

This project has sample code for a APIs written in node.
This project takes care of below items.

- Create User
- Update User
- Count of create/update user operation.

## How to set up?

- Set up Database
  - Install mongoDB
  - Create new database schema named `precilydatabase`
- Setup the backend.
  ```shell script
  npm install
  npm start
  ```
- The backend must start on port 4000.

### API Documentation

#### Create User

```shell script
 curl -X POST \
 http://localhost:4000/user/v1/create \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -H 'postman-token: 5f585961-4da4-1661-f606-e53320e16edd' \
 -d '{
     "firstName":"Avinash",
     "lastName":"Malviya",
     "address":"27 Ram Nilaya",
     "contact": 9876545678,
     "dateOfBirth": "05-22-1994"
     }'
```

```shell script
 {
     "statusCode": 200,
     "statusMessage": "User was created successfully."
 }
```

#### Update User

```shell script
 curl -X POST \
 http://localhost:4000/user/v1/update/:id \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -H 'postman-token: 5f585961-4da4-1661-f606-e53320e16edd' \
 -d '{
     "firstName":"AvinashUopdate",
     "lastName":"MalviyaUopdate",
     "address":"27 Ram NilayaUopdate",
     "contact": 9876545678,
     "dateOfBirth": "05-22-1994"
     }'
```

```shell script
 {
     "_id": "60d639e3bbc9fb41f2bc1d91",
     "firstName": "AvinashUopdate",
     "lastName": "MalviyaUopdate",
     "address": "27 Ram NilayaUopdate",
     "contact": 9876545678,
     "dateOfBirth": "1994-05-21T18:30:00.000Z",
     "__v": 0
 }
```

#### Counter for Create/Update

    Request

```shell script
 curl -X GET \
 http://localhost:4000/api_counter/v1/ \
 -H 'cache-control: no-cache' \
 -H 'postman-token: f0f7413f-eee2-55ab-9e56-ef5d4970a09c'
```

    Response

```shell script
 {
     "statusCode": 200,
     "statusMessage": "Counters fetched successfully",
     "data": {
         "createUserCount": 2,
         "updateUserCount": 3
     }
 }
```
