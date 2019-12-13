import React, {Component} from 'react';
import User from '../../components/User/User';
import Account from './Account/Account';
import prevIcon from '../../theme/svg/prev.svg';
import nextIcon from '../../theme/svg/next.svg';
import {connect} from 'react-redux';
import SearchBar from '../../components/Search/Search';
import * as actions from '../../redux/actions/index';

import classes from './Accounts.css';

class Accounts extends Component {
    state = {
        searchValue: ''
    }

    componentDidMount() {
        this.props.onFetchAccounts();
    }

    onChangedInputHandler = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }
    searchClickedHandler = () => {
        this.props.onSearchAccounts(this.state.searchValue, this.props.accounts);
    }

    filterClickedHandler = (role) => {
        const temp = '';
        this.setState({
            searchValue: temp
        })
        this.props.onFilterAccounts(role, this.props.accounts);
    }

    render() {
        let temp = null;
        if(this.props.isSearch) {
            temp = this.props.updatedAccounts
        }
        else if(this.props.isFilter) {
            temp = this.props.filteredAccounts;
        }
        else {
            temp = this.props.accounts;
        }
        let notFound = null;
        if(this.props.isFilter === true || this.props.isSearch === true) {
            notFound = (temp.length === 0) 
                        ? <p className={classes.mess}>Không kết quả được tìm thấy.</p> 
                        : <p className={classes.mess}>Tìm thấy {temp.length} kết quả.</p>;
        }
        
        
        const accs = temp.map(acc => {
            return <Account 
                            key={acc.id}
                            id={acc.id}
                            fullname={acc.fullName}
                            role={acc.role}
                            institution={acc.institution}
                            phoneNumber={acc.phoneNumber}
                            faculty={acc.faculty}
                            vnuMail={acc.vnuMail}
                            avatar={acc.avatar}/>
        })

        return  <div className={classes.Accounts}>
                    <User />
                    <SearchBar  changed={this.onChangedInputHandler}
                                value={this.state.searchValue}
                                searchClicked={this.searchClickedHandler}
                                filterClicked={(role) => this.filterClickedHandler(role)}/>
                    <div className={classes.accountsContainer}>
                        {notFound}
                        {accs}
                    </div>
                    <div className={classes.Buttons}>
                            <button>
                                <img src={prevIcon} alt='icon'  className={classes.prev}/>
                                Previous
                            </button>
                            <button>
                                Next
                                <img src={nextIcon} alt='icon' className={classes.next}/>
                            </button>
                    </div>
                </div>
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        filteredAccounts: state.accounts.filteredAccounts,
        error: state.accounts.error,
        updatedAccounts: state.accounts.updatedAccounts,
        isSearch: state.accounts.isSearch,
        isFilter: state.accounts.isFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounts: () => dispatch(actions.fetchAccounts()),
        onSearchAccounts: (value, accounts) => dispatch(actions.searchAccounts(value, accounts)),
        onFilterAccounts: (role, accounts) => dispatch(actions.filterAccounts(role, accounts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);