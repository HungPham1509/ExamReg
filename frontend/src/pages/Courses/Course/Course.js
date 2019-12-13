import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ModuleClasses from '../../ModuleClasses/ModuleClasses';
import ToggleIcon from '../../../theme/svg/add.svg';
import MinusIcon from '../../../theme/svg/subtract-symbol.svg';
import classes from './Course.css';

class Course extends Component {
    state = {
        toggle: false
    }

    toggleClickHandler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            }
        })
    }

    render() {
        let toggleButton = (this.state.toggle) ? <img src={MinusIcon} alt='icon'></img> : <img src={ToggleIcon} alt='icon'></img>

        const listMC = this.props.listModuleClasses.map(mc => {
            return <ModuleClasses key={mc.uuid} uuid={mc.uuid} code={mc.module_class_code} lecturer={mc.lecturer_name} show={this.state.toggle} courseName={this.props.courseName}/>
        })
        return (
            <div className={classes.Course}>
                <div className={classes.CourseName}>
                    <Link to={'/courses/courseID=' + this.props.uuid}>
                        {this.props.courseName}
                    </Link>
                    <button className={classes.ToggleButton} onClick={this.toggleClickHandler}>
                        {toggleButton}
                    </button>
                </div>
                <ul className={classes.MCList}>
                    {listMC}
                </ul>
            </div>
        )
    }
    
}

export default Course;