import React from 'react';
import ApolloClient from 'apollo-boost';
// import styled from 'styled-components';
// import { Spin } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
// import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
import Welcome from '../Welcome/Welcome';
// import Profile from '../../components/Profile';
// import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
import NotFound from '../NotFound/404';
import Settings from '../Settings';
import SingleDay from '../SingleDay';
import { MoodsPrevWeekProvider } from '../../contexts/MoodsPrevWeekContext';
// import styles from '../../styles/theme';

function Hello() {
  return <h1>Hello</h1>;
}
function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL,
    // request: async (operation) => {
    //   const token = await getTokenSilently();
    //   operation.setContext({
    //     headers: {
    //       authorization: token ? `Bearer ${token}` : '',
    //     },
    //   });
    // },
  });

  // return loading ? (
  //   <LoadingWrapper>
  //     <Spin size="large" />
  //   </LoadingWrapper>
  // ) : (

  return (
    <ApolloProvider client={client}>
      <MoodsPrevWeekProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/entryform" component={EntryForm} />
            <Route path="/dashboard" exact component={Moods} />
            <Route path="/dashboard/day/:day" component={SingleDay} />
            <Route path="/dashboard/settings" component={Settings} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
        <GlobalStyle />
      </MoodsPrevWeekProvider>
    </ApolloProvider>
  );
}

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;

//   .ant-spin-dot-item {
//     background-color: ${styles.darkJungleGreen} !important;
//   }
// `;

export default App;
