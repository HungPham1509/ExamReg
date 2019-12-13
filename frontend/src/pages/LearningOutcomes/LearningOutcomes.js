import React, {Component} from 'react';
import User from '../../components/User/User';

import classes from './LearningOutcomes.css';

class LearningOutcomes extends Component {
    render() {
        return  <div className={classes.LearningOutcomes}>
                    <User />
                    <div>
                        Danh sách chuẩn đầu ra
                    </div>
                </div>         
    }
}


export default LearningOutcomes;