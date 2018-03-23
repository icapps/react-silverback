import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers } from '../../redux/users/actions';
import { strings } from '../../utils';

class UserOverview extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  sortItems = (sortField, sortOrder) => {
    this.props.getUsers(sortField, sortOrder);
  }

  render() {
    return (
      <Overview
        title={strings.USERS}
        keys={[
          { id: strings.EMAIL, value: strings.EMAIL, isSortable: true },
          { id: strings.FIRST_NAME, value: strings.FIRST_NAME, isSortable: true },
          { id: strings.LAST_NAME, value: strings.LAST_NAME, isSortable: true },
          { id: strings.HAS_ACCESS, value: strings.HAS_ACCESS, isSortable: false },
          { id: strings.ROLE, value: strings.ROLE, isSortable: false },
        ]}
        listItems={this.props.users}
        removeItem={() => { }}
        sortItems={this.sortItems}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.userList,
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
