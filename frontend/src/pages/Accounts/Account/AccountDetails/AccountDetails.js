import React, {Component} from 'react';
import {connect} from 'react-redux';
import User from '../../../../components/User/User';
import Info from './Info';
import briefCase from '../../../../theme/svg/briefcase.svg';
import cap from '../../../../theme/svg/cap.svg';
import cake from '../../../../theme/svg/cake.svg';
import classes from './AccountDetails.css'


class AccountDetails extends Component {
    state = {
        elements: {
            fullName: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Họ và tên :',
            },
            birthday: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Ngày sinh :',
            },
            studentCode: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Mã sinh viên :',
            },
            email: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Email :',
            },
            vnuMail: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Vnu_mail :',
            },
            phoneNumber: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Số điện thoại :',
            },
            major: {
                elementType: 'select',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Ngành :',
            },
            majorCode: {
                elementType: 'select',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Mã ngành :',
            },
            year: {
                elementType: 'select',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Khóa :',
            },
            class: {
                elementType: 'select',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Lớp :',
            },
            note: {
                elementType: 'textarea',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Ghi chú :',
            },
        }
    }

    componentWillMount() {
        const accountId = this.props.match.params.id;
        let temp = null;
        let tempAccs = this.props.accounts;
        for(var i=0;i<tempAccs.length;i++) {
            if(tempAccs[i].id === accountId) {
                temp = tempAccs[i];
            }
        }
        const updatedElements = {
            ...this.state.elements
        }

        for(let element in updatedElements) {
            updatedElements[element].value = temp[element];
        }

        this.setState({
            elements: updatedElements
        })
    }

    render() {
        const temp = [];
        for(let ele in this.state.elements) {
            temp.push({
                id: ele,
                properties: this.state.elements[ele]
            });
        }
        const info = temp.map(ele => {
            return <Info key={ele.id}
                         elementType={ele.properties.elementType}
                         config={ele.properties.config}
                         value={ele.properties.value}
                         label={ele.properties.label}/>
        })

        const accountId = this.props.match.params.id;
        let tempAcc = null;
        let tempAccs = this.props.accounts;
        for(var i=0;i<tempAccs.length;i++) {
            if(tempAccs[i].id === accountId) {
                tempAcc = tempAccs[i];
            }
        }
        let m = null;
        if(tempAcc.role === 'Sinh viên') {
            let tempDate = tempAcc.birthday.split('/');
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            m = tempDate[0] + ' ' + month[tempDate[1]-1] 
        }
        

        return <div className={classes.AccountDetails}>
            <User />
            <div className={classes.AccountDetailsContainer}>
                <div className={classes.Header}>
                    <div className={classes.AvaName}>
                        <img src={tempAcc.avatar} alt='avatar' />
                        <p>{tempAcc.fullName}</p>
                    </div>
                    <div className={classes.introduction}>
                        <div className={classes.introductionInfo}>
                            <img src={briefCase} alt='icon'></img>
                            <p>{tempAcc.role} tại {tempAcc.institution}</p>
                        </div>
                        <div className={classes.introductionInfo}>
                            <img src={cap} alt='icon'></img>
                            <p>Khoa {tempAcc.faculty}</p>
                        </div>
                        <div className={classes.introductionInfo}>
                            <img src={cake} alt='icon'></img>
                            <p>{m}</p>
                        </div>
                    </div>
                    <div className={classes.Mode}>
                        <button>Profile</button>
                        <button>Edit profile</button>
                    </div>
                </div>
                <div className={classes.Body}>
                    {info}
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts
    }
}

export default connect(mapStateToProps)(AccountDetails);