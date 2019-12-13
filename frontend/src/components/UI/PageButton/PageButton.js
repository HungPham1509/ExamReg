import React from 'react';

import classes from './PageButton.css'

const pageButton = (props) => {
    let page = (props.page) ? <div className={classes.Page}>{props.page}</div> : null;
    return (
        <div className={[classes.PageButtons, props.style].join(' ')}>
            <button disabled={!props.showPrevious} onClick={props.previousClicked}>Previous</button>
            {page}
            <button disabled={!props.showNext} onClick={props.nextClicked}>Next</button>
        </div>
    )
}

export default pageButton;