# Home Library Service
## Part II - Containerization and Database (PostgreSQL) & ORM

To run the application, the next images pushed to Docker Hub are used:

[araneusx/nodejs2024q1-service-db](https://hub.docker.com/repository/docker/araneusx/nodejs2024q1-service-db) (242.52 MB Unpacked size)

[araneusx/nodejs2024q1-service-app](https://hub.docker.com/repository/docker/araneusx/nodejs2024q1-service-app) (490.13 MB Unpacked size)


## Steps to start:
### 1. Clone this repo
```
git clone https://github.com/araneusX/nodejs2024Q1-service.git
```

### 2. Go to the "part-2" branch
```
git checkout part-2
```
### 3. Install Docker and docker-compose according to the docs for your operating system.

### 4. Optionally change environment variables in the .env file.
The .env file is already included in the repository for this task. You can simply leave it as is, or change the values of variables. Do not delete the .env file or values of variables as these actions may break the application.

### 5. Run application in Docker containers

```
npm run containers:start
```

_**Please note!**_
_If you have problems with starting your application, check if the Docker service is running and if there are **NOT other containers running on the same PORT and DB_PORT (4000 and 5432 by default).**_

### _If nothing helps, please contact me in [discord](https://discordapp.com/users/673448628907540490) or [telegram](https://t.me/araneus_x)!_


### 6. Profit

- The application will be launched in development mode, its src directory inside the Docker container will be mounted into the project _src_ directory. **Any changes to this directory will lead to changes and rebuilds inside the container.**

- The database working directory will be mounted with the _database/data_ project directory. If you are using Linux, to view the contents of the data directory, you need to change its permissions after running the application in the container.

For example:
```
cd path_to_project_directory/database
sudo chmod 777 data
```
- Migrations are used to create database entities. The migration files for the database are located in the `src/modules/db/migrations` directory.

  **Migrations are applied automatically when the application starts**.

- TypeORM is used to work with entities in the database

- You can scan Docker images for vulnerabilities using the command 

```
npm run containers:scan
```

- If you want to run tests on your machine, you need to install application on your machine first:
```
npm install
```
```
npm test
```
