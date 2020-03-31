import React from 'react';
import { Router } from '@reach/router';
import Amplify from 'aws-amplify';

import config from '../aws-exports';
import Layout from '../components/layouts/Layout';

import PrivateRoute from '../components/_app/PrivateRoute';
import Details from '../components/_app/Details';

import { Login } from '../components/_app/_signin/Login';
import SignUp from '../components/_app/_signup/SignUp';
import { DashboardPage } from '../components/_app/_dashboard/DashboardPage';
import { MarketPage } from '../components/_app/_marketpage/MarketPage';
import { HomePage } from '../components/_app/_homePage/HomePage';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

Amplify.configure(config);

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app" component={DashboardPage} />
      <PrivateRoute path="/app/home" component={HomePage} />
      <PrivateRoute path="/app/profile" component={Details} />
      <Login path="/app/login" />
      <SignUp path="/app/signup" />
      <MarketPage path="/app/markets/:marketplaceId" />
    </Router>
  </Layout>
);

export default App;
