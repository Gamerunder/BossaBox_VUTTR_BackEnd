FORMAT: 1A

HOST: http://localhost:3000

# VUTTR API

API for challenge BossaBox

# Instructions

npm run dev - For run API

npm run testApi - For run tests

## About [/]

API for tool listing, with user registration, authentication and authorization

# Group Tools

## Tools [/tools]

### List all tools [GET]

+ Response 200 (application/json)
    + Attributes (array[ToolWithId])

+ Response 404 (application/json)
    + Attributes (Error)

### Create new tool [POST]

+ Request New tool

    + Headers

            Content-Type: application/json

    + Attributes (Tool)

+ Response 201 (application/json)
    + Attributes (ToolWithId)

+ Response 404 (application/json)
    + Attributes (Error)

## ToolsTags [/tools{?tag}]

+ Parameters
    + tag (string, required) - Parameter for search

### List tools match [GET]

+ Response 200 (application/json)
    + Attributes (array[ToolWithId])

+ Response 404 (application/json)
    + Attributes (Error)

## Tool [/tools/{idTool}]

+ Parameters
    + idTool (number, required) - Id for search/delete

### Delete tool [DELETE]

+ Response 200 (application/json)

+ Response 404 (application/json)

# Group SignIn

## SignIn [/signin]

### Login with user registered [POST]

+ Request Login

    + Headers

            Content-Type: application/json
        
    + Attributes (Signin)

+ Response 200 (application/json)
    + Attributes (Token)

+ Response 400 (application/json)
    + Attributes (Error)

# Group SignUp

## SignUp [/signup]

### Register new user [POST]

+ Request New user

    + Headers

            Content-Type: application/json

    + Attributes (Signup)

+ Response 201 (application/json)

+ Response 400 (application/json)

# Group User

## User [/user/{idUser}]

### Delete user by ID [DELETE]

+ Request Delete user

    + Headers

            Content-Type: application/json

+ Response 200 (application/json)

+ Response 400 (application/json)

# Data Structures

## Tool (object)
+ title (string) - Title tool
+ link (string) - Link tool
+ description (string) - Description tool
+ tags (array[string]) - Tags tool

## ToolWithId (Tool)
+ id (number) - Id new tool

## Signin (object)
+ email (string) - User e-mail
+ password (string) - User password

## Signup (Signin)
+ name (string) - User name
+ confirmPassword (string) - User confirm password

## Token (object)
+ token (string) - Token valid

## Error (object)
+ code: 400 (number) - Status code
+ message (string) - Status message
+ description (string) - Status description
