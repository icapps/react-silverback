import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getCodes } from '../../redux/codes/actions';

class CodesOverview extends Component {
  render() {
    return (
      <Overview
        title={strings.CODES}
        keys={[
          { id: identifiers.VALUE, value: strings.CODE, isSortable: true },
        ]}
        listItems={this.props.codes}
        history={this.props.history}
        paginationTotalCount={this.props.codesCount}
        get={this.props.getCodes}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

CodesOverview.propTypes = {
  codes: PropTypes.array.isRequired,
  codesCount: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getCodes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  codes: state.codes.codesList,
  codesCount: state.codes.codesCount,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodesOverview);
