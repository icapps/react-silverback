import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserOverview from '../scenes/users/UserOverview';
import { Header, Navbar } from '../components';
import { strings } from '../utils';
import UserDetail from '../scenes/users/UserDetail';
import LanguageCodesOverview from '../scenes/languageCodes/LanguageCodesOverview';
import LanguageCodesDetail from '../scenes/languageCodes/LanguageCodesDetail';

const AuthorizedLayout = props => {
  return (
    <React.Fragment>
      <Header toggleNavigation={props.toggleNavigation} logout={props.logoutUser}/>
      <div className="container-fluid">
        <div className="row">
          <Navbar
            links={[
              { name: strings.USERS, path: '/users' },
              { name: strings.LANGUAGE_CODES, path: '/language-codes' },
            ]}
            isNavigationShown={props.isNavigationShown}
            toggleNavigation={props.toggleNavigation}
            build={props.build}
            version={props.version}
          />
          <Switch>
            <Route path='/users' exact component={UserOverview} />
            <Route path='/users/:id' exact component={UserDetail} />
            <Route path='/language-codes' exact component={LanguageCodesOverview} />
            <Route path='/language-codes/:id' exact component={LanguageCodesDetail} />
            <Redirect to='/users' />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthorizedLayout;
