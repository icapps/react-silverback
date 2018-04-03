import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserOverview from '../scenes/users/UserOverview';
import DatatypeOverview from '../scenes/dataType/DataTypeOverview';
import { Header, Navbar } from '../components';
import { strings } from '../utils';
import DataTypeDetail from '../scenes/dataType/DataTypeDetail';
import UserDetail from '../scenes/users/UserDetail';
import CodesOverview from '../scenes/codes/CodesOverview';
import CodeTypeOverview from '../scenes/codeTypes/CodeTypeOverview';
import CodesDetail from '../scenes/codes/CodesDetail';
import CodeTypeDetail from '../scenes/codeTypes/CodeTypeDetail';

const AuthorizedLayout = props => {
  return (
    <React.Fragment>
      <Header toggleNavigation={props.toggleNavigation} />
      <div className="container-fluid">
        <div className="row">
          <Navbar links={[
            { name: strings.USERS, path: '/users' },
            { name: strings.DATATYPES, path: '/datatype' },
            { name: strings.CODES, path: '/codes' },
            { name: strings.CODE_TYPES, path: '/code-types' },
          ]} isNavigationShown={props.isNavigationShown} toggleNavigation={props.toggleNavigation} />
          <Switch>
            <Route path='/users' exact component={UserOverview} />
            <Route path='/users/:id' exact component={UserDetail} />
            <Route path='/datatype' exact component={DatatypeOverview} />
            <Route path='/datatype/:id' exact component={DataTypeDetail} />
            <Route path='/codes' exact component={CodesOverview} />
            <Route path='/codes/:id' exact component={CodesDetail} />
            <Route path='/code-types' exact component={CodeTypeOverview} />
            <Route path='/code-types/:id' exact component={CodeTypeDetail} />
            <Redirect to='/users' />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthorizedLayout;
