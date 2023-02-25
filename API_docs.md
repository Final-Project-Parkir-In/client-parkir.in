## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`

Routes below need authentication:
- `GET /user/parkingspot`
- `POST /user/bookparkingspot/:id`
- `POST /user/addcar`
- `DELETE /user/removecar/:id`



## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /user/parkingspot

Description:
- Get all available parking spot

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Abaddon",
    "imageUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png",
    "typeUrl": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
  },
  ...
]
```



## 4. GET /user/bookparkingspot/:id

Desription:
- Add parking slot to bookingslot table

- headers:

```json
{
  "access_token": "string",
}
```

_Response (201 - Created)_

```json
{
  "msg": "Parking slot has been booked",
}
```


## 5. GET /user/addcar

Desription:
- Add a car to the collection list

- headers:

```json
{
  "access_token": "string",
}
```
- body:

```json
{
  "numberPlate": "string",
  "brand": "string",
  "type": "string"
}
```

_Response (201 - Created)_

```json
{
  "msg": "Car has been added to garage",
}
```

## 5. DELETE /user/removecar/:id

Description:
- Remove a car from garage list and database

Request:

- headers:

```json
{
  "access_token": "string",
}
```
- params:

```json
{
  "id": "integer"
}
```



## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
