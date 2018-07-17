const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// const delay = () => new Promise(res => {
// 	console.log('delay has been called')
// 	setTimeout(() => {
// 		res(true)
// 	}, 1000)
// })

// const delay = () => new Promise(res => {
// 	setTimeout(() => {
// 		res(true)
// 	}, 1000)
// })

// the mock data and classes
const { Language, Framework, languages, frameworks } = require('./database')


const typeDefs = `
	type Query {
		languages: [Language]
		getLanguage(id: ID!): Language
	}
	type Language {
		id: ID!
		name: String!
		frameworks: [Framework]
	}
	type Framework {
		id: ID!
		name: String
	}
`

const resolvers = {
	Query: {
		languages: () => languages,
		getLanguage: (_, { id }) => {
			return languages.find(x => x.id === parseInt(id))
		}
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