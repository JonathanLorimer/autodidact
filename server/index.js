const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')


// // Connect to MongoDB
// const MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

// // Connection URL
// var url = 'mongodb://localhost:27017/autodidact';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   db.close();
// });


// the mock data and classes
const { insertUser, getUserByEmail, getUserById } = require('./database')


const typeDefs = `
	type Query {
		registerUser(email: String!, password: String!): Login
		loginUser(email: String!, password: String!): Login
		loginUserById(id: String!): Login
	}
	type Login {
		status: SuccessMessage!
		email: String!
		uuid: String!
	}
	type SuccessMessage {
		success: Boolean!
		message: String!
	}
`

const resolvers = {
	Query: {
		registerUser: (_, { email, password }) => {
			let user = {email, password}
			return insertUser(user).then(result => result)
		},
		loginUser: (_, { email, password }) => {
			let user = {email, password}
			return getUserByEmail(user).then(result => result)
		},
		loginUserById: (_, { id }) => {
			console.log(JSON.stringify(id))
			return getUserById(id).then(result => result)
		},
	}
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const app = express()
app.use(cors())

// actual graphql endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// use graphiql as well
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

app.listen(5000, () => console.log('Listening on port 5000'))