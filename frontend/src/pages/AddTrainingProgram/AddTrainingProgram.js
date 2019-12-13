import React, {Component} from 'react';
import User from '../../components/User/User';

import classes from './AddTrainingProgram.css';

class AddTrainingProgram extends Component {
    render() {
        return  <div className={classes.AddTrainingProgram}>
                    <User />
                    <div>
                        Tạo mới chương trình đào tạo
                    </div>
                </div>
    }
}


export default AddTrainingProgram;