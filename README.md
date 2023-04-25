# Air Ticket Booking

Air Ticket Booking is a simple airplane ticket booking system, where flights can be created and user can register and book them.


## Features

- Login / Signup
- Creating a Flight
- Get all Flights
- Get a Flights by id
- Update a Flight
- Delete a Flight
- Creating a Booking
- Check all bookings

## Tech Stack

**Server:** Node.js, Express.js, Mongoose

**Database:** MongoDB

## Run Locally

Clone the project

```bash
  git clone https://github.com/sarveshgupta1997/Air_Ticket_Booking_Backend.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongoURL`

`PORT`

`salt`

`secret`


## API Reference

#### Welcome

```http
  GET /
```

#### User Register

```http
  POST /api/register
```
`body{
  _id: ObjectId,
  name: String,
  email: String,
  password: String
}`

#### User  Login

```http
  POST /api/login
```
`body{
    email: String,
    password: String
}`

#### All Flights

```http
  GET /api/flights
```

#### Get Flights By ID

```http
  GET /api/flights/:flightID
```

#### Create Flight

```http
  POST /api/flights
```
`body{
  _id: ObjectId,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}`

#### Update Flight By ID

```http
  UPDATE /api/flights/:flightID
```
`body{
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}`

#### Delete Flight By ID

```http
  DELETE /api/flights/:flightID
```

#### Create Booking

```http
  POST /api/booking
```
`body{
  user : { type: ObjectId, ref: 'User' },
  flight : { type: ObjectId, ref: 'Flight' }
}`


#### Dashboard - See all Bookings

```http
  GET /api/dashboard
```

## Demo

[https://strange-plum-swallow.cyclic.app/](https://strange-plum-swallow.cyclic.app/)

## Authors

- [@sarveshgupta1997](https://github.com/sarveshgupta1997)
