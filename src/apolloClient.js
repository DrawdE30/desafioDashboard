import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiYmE5OTU0YzQtMDRhOC00OTY0LTg2ZmMtY2YzYzFkNDczODIzIiwicHJvamVjdElkIjoiNWFjMDBjYmMtOWVmNy00MDg2LWE1ODktMGIzZjZlZTRkMWU1IiwiZnVsbE5hbWUiOiJFZHdhcmQgRnVlbnRlcyBHb256YWxlcyIsImVtYWlsIjoiZWR3YXJkZmc5MUBnbWFpbC5jb20iLCJpYXQiOjE3MTI5NDMxMTl9.LlM6dc7yVLWPcFjTliAL3K5OIacTDzixsmKZgp7mA90`
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;