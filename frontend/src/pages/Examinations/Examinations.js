import React, {Component} from 'react';
import {connect} from 'react-redux';
import Examination from './Examination/Examination';
import * as actions from '../../redux/actions/index';
import classes from './Examinations.css';

class Examinations extends Component {

    componentDidMount() {
        this.props.onFetchExaminations();
    }

    render() {
        const list = this.props.examinations.map(ex => {
            return <Examination key={ex.uuid} link={ex.uuid} year={ex.year} semester={ex.semester}/>
        })

        return  <div className={classes.Examinations}>
                    <div className={classes.Title}>Dang sách kì thi</div>
                    <ul className={classes.List}>
                        {list}
                    </ul>
                </div>
    }
}


const mapStateToProps = (state) => {
    return {
        examinations: state.examinations.examinations,
        error: state.students.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExaminations: () => dispatch(actions.fetchExaminations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examinations);