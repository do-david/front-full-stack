/*eslint complexity: ["error", 6]*/

import fetch from 'node-fetch';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';

import API_CONFIG from 'utils/config/nextConfig';

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   * Here we also delete the session if it is older than 24 hours
   */
  const session = process.browser ? localStorage.getItem('session') : null;
  const sessionAge = process.browser
    ? localStorage.getItem('session-expiry')
    : null;
  const todaysDate = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const olderThan24h = new Date(todaysDate) - new Date(sessionAge) > oneDay;

  if (olderThan24h && process.browser) {
    localStorage.removeItem('session');
    localStorage.removeItem('session-expiry');
  }
  if (session) {
    operation.setContext(() => ({
      headers: {
        'Eshop-session': `Session ${session}`,
      },
    }));
  }
  return forward(operation);
});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const session = headers.get('session');

    if (session && process.browser) {
      // Remove session data if session destroyed.
      if ('false' === session) {
        localStorage.removeItem('session');
        // Update session new data if changed.
      } else if (localStorage.getItem('session') !== session) {
        localStorage.setItem('session', headers.get('Eshop-session'));
        localStorage.setItem('session-expiry', new Date());
      }
    }
    return response;
  });
});

const clientSide = typeof window === 'undefined';

// Apollo GraphQL client.
const client = new ApolloClient({
  ssrMode: clientSide,
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        uri: API_CONFIG.GRAPHQL_URL,
        fetch,
      })
    )
  ),
  cache: new InMemoryCache(),
});

export default client;