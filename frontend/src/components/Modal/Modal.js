import React from 'react';
import BackDrop from '../UI/BackDrop/BackDrop';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <div>
            <BackDrop show={props.show} clicked={props.clicked}/>
            <div className={classes.Modal}
                 style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
                <button onClick={props.clicked} className={classes.Save}>OK</button>
            </div>  
        </div>
    )
}

export default modal;