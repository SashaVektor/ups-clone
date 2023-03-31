import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://abrera.stepzen.net/api/ignoble-goose/__graphql',
  headers: {'Authorization':'apikey abrera::stepzen.io+1000::03f174633b2de665f13c74d1364f68d6ba8f3f9a584ed2082bbf620bbe733e04'},
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
