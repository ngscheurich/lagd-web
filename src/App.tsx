import React, {Component} from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <Query
              query={gql`
                {
                  info {
                    name
                    version
                  }
                }
              `}>
              {({loading, error, data}) => {
                if (loading) return <p>Loading…</p>;
                if (error) return <p>Error! {error.message}</p>;

                const {
                  info: {name, version},
                } = data;

                return (
                  <pre>
                    {name} v{version}
                  </pre>
                );
              }}
            </Query>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
