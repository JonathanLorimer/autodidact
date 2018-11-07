import ApolloClient from 'apollo-boost'
export let apollo;

if (process.env.NODE_ENV !== 'test'){
   apollo = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
  })
}