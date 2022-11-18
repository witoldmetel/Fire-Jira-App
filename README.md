# Fire Jira App

## Legacy

Here you have previous version of this app: [Legacy Fire Jira](https://github.com/witoldmetel/Fire-Jira-App-Legacy)

## Demo

https://fire-jira.web.app/

## Prerequisites

#### Env file

To build or run the project locally add .env file to root directory:

```
# Firebase config
FIREBASE_API_KEY = '<YOUR_API_KEY>'
FIREBASE_AUTH_DOMAIN = '<YOUR_AUTH_DOMAIN>'
FIREBASE_DATABASE_URL = '<YOUR_DATABASE_URL>'
FIREBASE_PROJECT_ID = '<YOUR_PROJECT_ID>'
FIREBASE_STORE_BUCKET = '<YOUR_STORE_BUCKET>'
FIREBASE_MESSAGING_SANDER_ID = '<YOUR_MESSAGING_SANDER_ID>'
FIREBASE_APP_ID = '<YOUR_APP_ID>'
FIREBASE_MEASUREMENT_ID = '<YOUR_MEASUREMENT_ID>'
```

Where values in the brackets should be replaced by described data.

You can take this configuration from `https://firebase.google.com/`

## Deploy

https://firebase.google.com/docs/hosting/quickstart

```
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File dist/index.html already exists. Overwrite? No
```

## Storybook

I've started to write interactive documentation in `Storybook`.

You can check it here: [Storybook](https://firejira-storybook.netlify.app/)

## Assets source

All graphics taken from: [undraw.co](https://undraw.co/illustrations)
