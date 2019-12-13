import React, {Component} from 'react';
import User from '../../components/User/User';

import classes from './TrainingProgramDocuments.css';

class TrainingProgramDocuments extends Component {
    render() {
        return  <div className={classes.TrainingProgramDocuments}>
                    <User />
                    <div>
                        Danh sách tài liệu chương trình đào tạo
                    </div>
                </div>
                
    }
}


export default TrainingProgramDocuments;