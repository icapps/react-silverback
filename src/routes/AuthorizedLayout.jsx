import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserOverview from '../scenes/users/UserOverview';
import DatatypeOverview from '../scenes/dataType/DataTypeOverview';
import { Header, Navbar } from '../components';
import { labels } from '../utils';
import DataTypeDetail from '../scenes/dataType/DataTypeDetail';

const AuthorizedLayout = props => {
  return (
    <React.Fragment>
      <Header toggleNavigation={props.toggleNavigation} />
      <div className="container-fluid">
        <div className="row">
          <Navbar links={[
            { name: labels.USERS, path: '/users' },
            { name: labels.DATATYPES, path: '/datatype' },
          ]} isNavigationShown={props.isNavigationShown} toggleNavigation={props.toggleNavigation} />
          <Switch>
            <Route path='/users' exact component={UserOverview} />
            <Route path='/datatype' exact component={DatatypeOverview} />
            <Route path='/datatype/:id' exact component={DataTypeDetail} />
            <Redirect to='/datatype' />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthorizedLayout;
