import React, {Component} from 'react';
import {connect} from 'react-redux';
import Examination from '../Examinations/Examination/Examination';
import * as actions from '../../redux/actions/index';
import classes from './Register.css';

class Register extends Component {

    componentDidMount() {
        this.props.onFetchExaminations();
    }

    render() {
        const list = this.props.examinations.map(ex => {
            return <Examination key={ex.uuid} link={'/register/studentID=' + this.props.userId + '/examinationID=' + ex.uuid} year={ex.year} semester={ex.semester}/>
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
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExaminations: () => dispatch(actions.fetchExaminations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);