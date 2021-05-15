# URL Shortner

An basic URL Shortner application written in Nodejs. It uses ExpressJS, Mongoose, EJS, ShortId and http-errors packages.

The application generates short URL for any long URl provided and if the URL was generated previously it resturns the same short URL insteaed of creating a new one. 

## Installation

This application requires [Node.js](https://nodejs.org/) to run.

Run the following command to clone the repository and install the dependencies and devDependencies.


```sh
# Cloning the repo
git clone https://github.com/darkpanda08/url-shortner.git

# Changing Directory
cd url-shortner

# Installing dependencies
npm install
```
## Run in Development Mode 👩‍💻
> Set environment variables "MONGO_URI" with MongoDB URI. Other environment variable are defined in the .env.exapmle file provided. Just rename that file to .env to use with application in developemnt mode.
```sh
npm run dev
```

## Run in Production Mode 🌐
> Set environment variables "MONGO_URI" with MongoDB URI and "BASE_URL" as the base URL of application (eg. https://example.com)
```sh
npm start
```