import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import ToggleIcon from '../../../theme/svg/arrow-point-to-right.svg';
import Item from './Item/Item';
import classes from './HigherOrderItems.css';

class HigherOrderItems extends Component {
    render() {
        const items = this.props.items;
        let listItems = null;
        if(items) {
            listItems = items.map(item => {
                if(this.props.toggleOn) {
                    return <Item key={item.label} label={item.label} link={item.url} />
                }
                else {
                    return ;
                }
            })
        }
        let list = null;
        let toggleIcon = null;
        if(this.props.label!=='Thống Kê') {
            list = (!this.props.collapsed) ? <ul className={classes.itemsContainer}>
                                                {listItems}
                                             </ul> 
                                           : <ul className={classes.itemsContainerOff}>
                                                {listItems}
                                             </ul>
            
            if(!this.props.toggleOn) {
                toggleIcon = <img className={classes.ToggleOff} src={ToggleIcon} alt='icon' />

            }
            else {
                toggleIcon = <img  className={classes.ToggleOn} src={ToggleIcon} alt='icon' />
            }
        }
        
        let higherOrderItem = null;
        if(this.props.label === 'Thống Kê') {
            higherOrderItem = (!this.props.collapsed) ?  <NavLink to='/statistics' className={classes.container} onClick={this.props.clicked}>
                                                            <div className={classes.Label}>
                                                                <img src={this.props.icon} alt='icon'/>    
                                                                <div>{this.props.label}</div>
                                                            </div>
                                                            {toggleIcon}
                                                        </NavLink>
                                                     :  <NavLink to='/statistics' className={classes.containerOff} >
                                                                <img src={this.props.icon} alt='icon'/>   
                                                        </NavLink>
           
        }
        else {
            higherOrderItem = (!this.props.collapsed) ?  <div className={classes.container} onClick={this.props.clicked}>
                                                            <div className={classes.Label}>
                                                                <img src={this.props.icon} alt='icon'/>    
                                                                <div>{this.props.label}</div>
                                                            </div>
                                                            {toggleIcon}
                                                        </div>
                                                     :  <div className={classes.containerOff}>
                                                            <img src={this.props.icon} alt='icon'/>
                                                            <div className={classes.labelContainerOff} style={(this.props.toggleOn) ? {visibility: 'unset'} : {visibility: 'hidden'}}>{this.props.label}</div>  
                                                        </div>
        }
        
        return (
            <li  onMouseOver={this.props.onMouseOver}>
                {higherOrderItem}
                {list}
            </li>
        )
    }
    
}

export default HigherOrderItems;