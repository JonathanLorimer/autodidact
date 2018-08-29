# Autodidact
Self-learning side project to help me familiarize myself with GraphQL and MongoDB

After cloning the repo you will need to run ``npm install`` to download the dependencies

The node.js driver for MongoDB should have been downloaded when you installed the dependencies.

Run this command from the directory root to make your own Mongo DB store

```mkdir -p /data/db```

You will need 3 terminal windows open to run this app locally.

In the first we are going to generate our MongoDB server, run:

```mongod```

In the second we are going to use node to generate our server, run:

```node ./server/index.js```

Finally we are going to locally host the app, run:

```npm run dev```

A window should open to http://localhost:8080