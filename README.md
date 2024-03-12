# Home Library Service

## Steps to start:
### 1. Clone this repo
```
git clone https://github.com/araneusX/nodejs2024Q1-service.git
```

### 2. Go to the develop branch
```
git checkout develop
```

### 3. Install NPM modules

```
npm install
```
_**Please note!**_
_If you have problems with the installation, try using the `npm ci` command. Also you can try running `npm install` with `--legacy-peer-deps` flag_
_If nothing helps, please contact me!
[discord](https://discordapp.com/users/673448628907540490) or [telegram](https://t.me/araneus_x)_

### 4. Optionaly create .env file (based on .env.example) and define a PORT variable.

### 5. Runn application

```
npm start
```

After starting the app on port (specified in .env file or 4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:{PORT}/api.

### 6. Run tests

After application running open **new terminal** and enter:

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

