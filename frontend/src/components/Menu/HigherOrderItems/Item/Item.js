import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Item.css';

const item = (props) => {
    return <NavLink to={props.url} activeClassName={classes.Active} className={classes.Item}>
        {props.label}
    </NavLink>
}

export default item;