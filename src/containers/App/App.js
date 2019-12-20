import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
import styles from '../../styles/theme';
import SignIn from '../../components/Auth/SignIn';
import SignUp from '../../components/Auth/SignUp';
import DailyTask from '../../components/DailyTask';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
import ChartViews from '../../components/ChartViews';
import NotFound from '../NotFound/404';
import Settings from '../Settings';
import LoadingSpinner from '../../components/LoadingSpinner';
import Tasks from '../Tasks';
import Welcome from '../Welcome/Welcome';

function App() {
  const { loading } = useAuth();

  const client = new ApolloClient({
    uri: GRAPHQL_URI,
    request: async (operation) => {
      const { token } = localStorage;
      operation.setContext({
        headers: {
          authorization: token ? `${token}` : '',
        },
      });
    },
  });

  return loading ? (
    <LoadingSpinner height="100vh" />
  ) : (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <PrivateRoute path="/entryform" component={EntryForm} />
          <PrivateRoute path="/dashboard/settings" component={Settings} />
          <PrivateRoute path="/dashboard/charts" component={ChartViews} />
          <PrivateRoute path="/dashboard/tasks" exact component={Tasks} />
          <PrivateRoute path="/dashboard/tasks/:task" component={DailyTask} />
          <PrivateRoute path="/dashboard" component={Moods} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default App;
