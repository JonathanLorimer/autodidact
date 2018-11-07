import ApolloClient from 'apollo-boost'
// FIXME: Come up with better solution than this
export default process.env.NODE_ENV === 'test' ? null : new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})