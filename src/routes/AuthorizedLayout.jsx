import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserOverview from '../scenes/users/UserOverview';
import DatatypeOverview from '../scenes/dataType/DataTypeOverview';
import { Header, Navbar } from '../components';

const AuthorizedLayout = props => {
  return (
    <React.Fragment>
      <Header toggleNavigation={props.toggleNavigation} />
      <div className="container-fluid">
        <div className="row">
          <Navbar links={[
            { name: 'Users', path: '/users' },
            { name: 'Datatype', path: '/datatype' },
          ]} isNavigationShown={props.isNavigationShown} toggleNavigation={props.toggleNavigation} />
          <Switch>
            <Route path='/users' exact component={UserOverview} />
            <Route path='/datatype' exact component={DatatypeOverview} />
            <Redirect to='/users' />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthorizedLayout;
