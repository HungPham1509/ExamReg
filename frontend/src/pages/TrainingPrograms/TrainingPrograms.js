import React, {Component} from 'react';
import User from '../../components/User/User';

import classes from './TrainingProgram.css';

class TrainingPrograms extends Component {
    render() {
        return< div className={classes.TrainingPrograms}>
                    <User />
                    <div>
                        Danh sách chương trình đào tạo
                    </div>
                </div>
                

    }
}


export default TrainingPrograms;