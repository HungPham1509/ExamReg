import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Examination.css';

const examination = (props) => {
    return (
        <li>
            <Link to={props.link}>
                Kì {props.semester} Năm học {props.year}
            </Link>
        </li>
    )
}

export default examination;