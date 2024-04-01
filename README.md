# Home Library Service
## Part III - Logging & Error Handling and Authentication and Authorization

## Steps to start:
### 1. Clone this repo
```
git clone https://github.com/araneusX/nodejs2024Q1-service.git
```

### 2. Go to the "develop" branch
```
git checkout develop
```

### 3. Install the application
```
npm install
```

### 4. Install Docker and docker-compose according to the docs for your operating system.

### 5. Optionally change environment variables in the .env file.
The .env file is already included in the repository for this task. You can simply leave it as is, or change the values of variables. Do not delete the .env file or values of variables as these actions may break the application.

### 6. Run application (with DB in Docker container)
```
npm run start:db
```
or
```
npm run start:dev:db
```

### 7. Open **another terminal** and  run tests with authorization
```
npm run test:auth
```

_**Please note!**_
_If you have problems with starting your application, check if the Docker service is running and if there are **NOT other containers running on the same DB_PORT (5432 by default).**_

### _If nothing helps, please contact me in [discord](https://discordapp.com/users/673448628907540490) or [telegram](https://t.me/araneus_x)!_
