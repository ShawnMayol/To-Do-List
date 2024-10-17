# Task: 
To-Do List. Build a front-end interface for a simple To-Do List using HTML, JS, CSS. You should also be able to integrate the APIs provided below.

# Functions:
  1. Get all to do items – Displays a list of all to do items (id, title & completed). You can use a table element or anything that will represent a list.
  2. Get single to do items – Displays a single to do item (id, title, completed) once selected from the list.
  3. Add to do item – Adds a to do item (title & completed). It should reflect in your list of to do items. (Base this on the response of the API)
  4. Edit single to do item – Edits a selected single to do item (title & completed). Changes should reflect in the list of to do items. (Base this on the response of the API)
  5. Delete single to do item – Removes a selected single to do item. Removal should reflect int the list of to do items. (Base this on the response of the API)

# To-Do APIs:

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
