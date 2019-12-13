import React, {Component} from 'react';
import UserImage from '../../theme/images/user.png';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import logoutIcon from '../../theme/svg/logout.svg';
import * as actions from '../../redux/actions/index';
import classes from './User.css'

class User extends Component {
    handleLogoutClicked = () => {
        this.props.onLogout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={classes.UserContainer}>
                    <div className={classes.User}>
                        <img src={UserImage} alt={'user'}/>
                        <p>Admin</p>
                    </div>
                    <button className={classes.Logout} onClick={this.handleLogoutClicked}>
                            Log Out
                            <img src={logoutIcon} alt='logout'/>
                    </button>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));