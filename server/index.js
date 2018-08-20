const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// the mock data and classes
const { 
	insertUser, 
	getUserByEmail, 
	getUserById,
	insertLearningPath
} = require('./database')





const typeDefs = `
	input LearningPathInput {
		learningPath: Path
		learningMaterials: [Material]
	}

	input Material {
		id: String
		name: String
		type: String
		link: String
		preReq: Material
	}

	input Path {
		id: String!
		nodes: [Path]
	}

	type Query {
		registerUser(email: String!, password: String!): Login
		loginUser(email: String!, password: String!): Login
		loginUserById(id: String!): Login
	}

	type Mutation {
		registerLearningPath(input: LearningPathInput, userId: String!, name: String!): PathResponse
	}

	type Login {
		status: SuccessMessage!
		email: String!
		uuid: String!
		learningPaths: [String] 
	}
	type SuccessMessage {
		success: Boolean!
		message: String!
	}
	type PathResponse {
		status: SuccessMessage!
		id: String!
	}
`

const resolvers = {
	Query: {
		registerUser: (_, user) => insertUser(user).then(result => result),
		loginUser: (_, user) => getUserByEmail(user).then(result => result),
		loginUserById: (_, { id }) => getUserById(id).then(result => result),
	},
	Mutation: {
		registerLearningPath: (_, learningObj) => insertLearningPath(learningObj).then(result => result)
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