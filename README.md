[![Build Status](https://travis-ci.org/johnmutuma5/SMS-Management-API.svg?branch=develop)](https://travis-ci.org/johnmutuma5/SMS-Management-API)
[![Coverage Status](https://coveralls.io/repos/github/johnmutuma5/SMS-Management-API/badge.svg?branch=develop)](https://coveralls.io/github/johnmutuma5/SMS-Management-API?branch=develop)

# SMS-Management-API
An API for allowing users to manage Short messaging
- Add Contacts
- Delete Contacts - deletes all associtated SMSs
- Store SMS

## Running the application

### Prerequisites
You'll need to have docker and docker-compose installed locally on you machine to run the application using these instructions

- Navigate to the project's root directory
- Run `make run`

### Interact with the API
Use a client application of your choice to interact with the API. 

You could use `Postman` or `curl` if you will, but the API exposes a it's Swagger Docs on [here](http://localhost:3000/api-docs). You can comfortably use that on each endpoint by hitting the Try it Out button after you expand the endpoint documetation accordion.

## Runniung the Tests
Navigate to the project root directory and run
- `make test`

## Opening the database

If you'd like to have a look into the contents of the database, navigate into the root directory on the project and run 
- `make open-db`

