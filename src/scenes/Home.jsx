import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../modules/user/actions';
import Button from '../components/button/Button';
import './home.css';

class Home extends Component {
	test = (e) => {
		this.props.dispatchers.setUsername(e.target.value);
	};

	render() {
		return (
			<div className="app">
				<p className="app-intro">
					Please type in your name:&nbsp;&nbsp;&nbsp;
					<input type="text" onChange={this.test} />
				</p>
				<p className="app-link">{this.props.username.length >= 3 && <Button link="/jokes">Let me laugh</Button>}</p>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		dispatchers: bindActionCreators(userActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
