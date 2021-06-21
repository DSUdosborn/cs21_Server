# cs-todo-2021

- npm init
- node install --save
  - express
  - mongoose
  - cors
- docker
  - docker run -d --name cs-todo-2021-mongo -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=cs-todo-2021 -p 27017:27017 -v $PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/ mongo

# API Reference

## List

List all of the todos in the database

### Method

- GET

### Path

- /todo

### Body Arguments

- N/A

### Success Code

- 200

### Error Codes

- 500 == Any Error

### Example Successful Return

```json
[
  {
    "_id": "60a480fbf9c872478ed3da2b",
    "name": "My Todo",
    "description": "cool description",
    "done": false,
    "deadline": "2021-05-19T03:07:39.499Z",
    "__v": 0
  },
  {
    "_id": "jd9834jc8849cjf84830294j",
    "name": "My Other Todo",
    "description": "another cool description",
    "done": true,
    "deadline": "2021-05-25T03:12:00.000Z",
    "__v": 0
  }
]
```

---

## Get

Get a specific

### Method

- GET

### Path

- /todo/{id}

### Body Arguments

- N/A

### Success Code

- 200

### Error Codes

- 404 == Not Found
- 500 == Any Other Error

### Example Successful Return

```json
{
  "_id": "60a480fbf9c872478ed3da2b",
  "name": "My Todo",
  "description": "cool description",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z",
  "__v": 0
}
```

---

## Create

Create a new todo. Any argument that is left out will default.

- Strings == `""`
- Boolean == `false`
- Data = `new Data()` i.e now

### Method

- POST

### Path

- /todo/

### Body Arguments

```json
{
  "name": "",
  "description": "",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z"
}
```

### Success Code

- 201

### Error Codes

- 500 == Any Error

### Example Successful Return

```json
{
  "_id": "60a480fbf9c872478ed3da2b",
  "name": "My Todo",
  "description": "cool description",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z",
  "__v": 0
}
```

---

## Replace

Completely replace an existing todo. Any argument that is left out will not get updated.

### Method

- PUT

### Path

- /todo/{id}

### Body Arguments

```json
{
  "name": "",
  "description": "",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z"
}
```

### Success Code

- 200

### Error Codes

- 404 == Not Found
- 500 == Any Other Error

### Example Successful Return

```json
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```

---

## Update

Updates an existing todo. Any argument that is left out will default.

- Strings == `""`
- Boolean == `false`
- Data = `new Data()` i.e now

### Method

- PATCH

### Path

- /todo/{id}

### Body Arguments

```json
{
  "name": "",
  "description": "",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z"
}
```

### Success Code

- 200

### Error Codes

- 404 == Not Found
- 500 == Any Other Error

### Example Successful Return

```json
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```

---

## Delete

Removes an existing todo.

### Method

- DELETE

### Path

- /todo/{id}

### Body Arguments

- N/A

### Success Code

- 200

### Error Codes

- 404 == Not Found
- 500 == Any Other Error

### Example Successful Return

```json
{
  "_id": "60a480fbf9c872478ed3da2b",
  "name": "My Todo",
  "description": "cool description",
  "done": false,
  "deadline": "2021-05-19T03:07:39.499Z",
  "__v": 0
}
```
