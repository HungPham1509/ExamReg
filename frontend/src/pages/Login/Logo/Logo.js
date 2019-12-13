import React from 'react';
import Logo from '../../../theme/images/logo-outline.png';
import * as constants from '../../../constants/string';

import classes from './Logo.css';

const logo = (props) => {
    return <div className={classes.Logo}>
        <img src={Logo} alt='UET-Logo' />
        <div className={classes.Title}>{constants.TITLE}</div>
        <div className={classes.Title}>{constants.UNIVERSITY}</div>
    </div>
}

export default logo;