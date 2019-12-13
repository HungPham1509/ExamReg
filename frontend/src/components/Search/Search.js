import React from 'react';
import {connect} from 'react-redux';
import searchIcon from '../../theme/svg/search.svg';
import * as constants from '../../constants/string';
import classes from './Search.css';

const searchBar = (props) => {
    let numOfMods = 0;
    let numOfLecturers = 0;
    let numOfStudents = 0;
    for(var i=0;i<props.accounts.length;i++) {
        switch(props.accounts[i].role) {
            case constants.MODERATOR:
                numOfMods +=1 ;
                break;
            case constants.LECTURER:
                numOfLecturers += 1;
                break;
            case constants.STUDENT:
                numOfStudents += 1;
                break;
            default:
                return;
        }
    }

    return (
        <div className={classes.SearchBar}>
            <div className={classes.FilterButtons}>
                <button onClick={() => props.filterClicked(constants.MODERATOR)}>{constants.MODERATOR} ({numOfMods})</button>
                <button onClick={() => props.filterClicked(constants.LECTURER)}>{constants.LECTURER} ({numOfLecturers})</button>
                <button onClick={() => props.filterClicked(constants.STUDENT)}>{constants.STUDENT} ({numOfStudents})</button>
                <button onClick={() => props.filterClicked(constants.ALL)}>{constants.ALL} ({props.accounts.length})</button>
            </div>
            <input className={classes.SearchInput} type='text' value={props.value} placeholder='SEARCH FOR SOMETHING' onChange={props.changed}/>
            <button className={classes.SearchButton} onClick={props.searchClicked}>
                <p>SEARCH</p>
                <img src={searchIcon} alt='icon'></img>
            </button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        error: state.accounts.error
    }
}

export default connect(mapStateToProps)(searchBar);