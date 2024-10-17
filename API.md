ToDo APIs:

GET ALL:
Method: GET
URL: https://jsonplaceholder.typicode.com/todos/
Sample Response (Success):
[
  {
    "userId": 1,//disregard this property
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,//disregard this property
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
]

GET SINGLE ToDo:
Method: GET
URL: https://jsonplaceholder.typicode.com/todos/{id:}
Data Needed: 
id
Sample Request:  https://jsonplaceholder.typicode.com/todos/1
Sample Response (Success):
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}

ADD:
Method: POST
URL: https://jsonplaceholder.typicode.com/todos
Data Needed: 
{
    "userId": 1,
    "title": "Todo 1",
    "completed": false
}

Sample Request: https://jsonplaceholder.typicode.com/todos
Sample Response (Success):
{
    "userId": 1,
    "title": "Todo 1",
    "completed": false,
    "id": 201 //id of the newly added contact
}

EDIT:
Method: PUT
URL: https://jsonplaceholder.typicode.com/todos/{id:}
Data Needed:
 {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": true
}

Sample Request: https://jsonplaceholder.typicode.com/todos/1
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": true
}

Sample Response (Success):
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": true
}

DELETE:
Method: POST
URL: https://jsonplaceholder.typicode.com/todos/{id:}
Data Needed: 
id
Sample Request:  https://jsonplaceholder.typicode.com/todos/1
Sample Response (Success):
{}



