"use client";

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const initCache = (initialState?: any) => {
  const cache = new InMemoryCache().restore(initialState || {});
  
  /**
   * Cache uses localStorage to save data.
   * 
   * This cache is used by Apollo (graphql client).
   */
  if(typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage)
    });
  }
  
  return cache;
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://wpe-hiring.tokopedia.net/graphql",
  });

  return new ApolloClient({
    cache: initCache(),
    link: httpLink
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloProvider client={makeClient()}>
      {children}
    </ApolloProvider>
  );
}

export {};