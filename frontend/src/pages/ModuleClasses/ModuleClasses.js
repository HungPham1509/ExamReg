import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './ModuleClasses.css';

class ModuleClasses extends Component {
    render() {
        let ModuleClassStyle = (this.props.show) ? classes.ModuleClass : classes.Hide
        return (
            <li className={ModuleClassStyle}>
                <Link to={'/courses/module-classes/moduleClassID=' + this.props.uuid}>{this.props.courseName}_{this.props.code}</Link>
                <div>{this.props.lecturer}</div>
            </li>
        )
        
    }
}

export default ModuleClasses;