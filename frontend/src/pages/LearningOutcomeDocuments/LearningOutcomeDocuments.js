import React, {Component} from 'react';
import User from '../../components/User/User';

import classes from './LearningOutcomeDocuments.css';

class LearningOutcomeDocuments extends Component {
    render() {
        return  <div className={classes.LearningOutcomeDocuments}>
                    <User />
                    <div>
                        Danh sách tài liệu chuẩn đầu ra
                    </div>
                </div>       
    }
}


export default LearningOutcomeDocuments;