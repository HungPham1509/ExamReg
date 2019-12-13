import React from 'react';
import {Link} from 'react-router-dom';
import roleIcon from '../../../theme/svg/role.svg'
import briefCase from '../../../theme/svg/briefcase.svg';
import cap from '../../../theme/svg/cap.svg';
import phone from '../../../theme/svg/phone.svg';
import mail from '../../../theme/svg/mail.svg';
import tempAvatar from '../../../theme/svg/tempAvatar.svg';
import classes from './Account.css';

const account = (props) => {
    let ava = (props.avatar) ? <img src={props.avatar} alt='icon'></img> : <img src={tempAvatar} alt='icon'></img>;
    return <Link to={'/accounts/' + props.id} className={classes.Account}>
                {ava}
                <div className={classes.Info}>
                    <p>{props.fullname}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={roleIcon} alt='icon' />
                                    {props.role}
                                </td>
                                <td>
                                    <img src={briefCase} alt='icon' />
                                    {props.institution}
                                </td>
                                <td>
                                    <img src={phone} alt='icon' />
                                    {props.phoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <img src={cap} alt='icon' />
                                    {props.faculty}
                                </td>
                                <td>
                                    <img src={mail} alt='icon' />
                                    {props.vnuMail}
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
    </Link>
}

export default account;