import React from 'react'
import Logo from '../../../theme/svg/book.svg';
import classes from './Header.css';

const header = (props) => {

    return (<div className={classes.MenuHeader}>
                <div className={classes.Logo}>
                    <img src={Logo} alt='logo'/>
                    <div className={classes.Text}>Hệ Thống Đăng kí dự thi</div>
                </div>
            </div>)
            
                        
}

export default header;