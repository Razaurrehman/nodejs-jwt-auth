# NodeJs MongoDB Express

This project was generated with nodejs, mongodb, express, bodyparser, bcryptjs, jsonwebtoken, mongoose

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8081/`. The app will automatically reload if you change any of the source files.


## API Routes

enivrnoment Variable: https://localhost:8081

    -For SignUp: api/auth/signup
        POST Request
        payload: {
            username: string,
            email: string,
            password: string,
            roles: ["user", "admin", "moderator"]
        }
    -For SignIn: api/auth/signin
        POST Request
        payload: {
            username: string,
            password: string,
        }
    -For Admin: api/test/admin
        GET Request

    -For User: api/test/user
        GET Request
        Header: {
            x-access-token: xxxxxxxxxxxxx
        }
    -For Moderator's: api/test/mod
        GET Request

    For Refresh Token
        POST Request
        payload: {
            refreshToken: xxxxxxxxxxxxxxxx
        }
