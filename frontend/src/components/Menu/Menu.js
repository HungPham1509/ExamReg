import React, {Component} from 'react';
import Header from '../Menu/Header/Header';
import Item from '../Menu/HigherOrderItems/Item/Item';
import Footer from './Footer/Footer';
import classes from './Menu.css';
import {connect} from 'react-redux';
import * as items from '../../constants/Items';


class Menu extends Component {
    render() {
        const navArray = [];
        for(let item in items.menuItems) {
            navArray.push({
                navItem: items.menuItems[item]
            });
        }
        let temp = (this.props.role == 0) ? navArray.slice(0, 3) : navArray.slice(3, 5)
        const navItems = temp.map(item => {
            return (
                <Item key={item['navItem'].label}
                      label={item['navItem'].label}
                      icon={item['navItem'].icon}
                      url={item['navItem'].url}/>
            )
        })

        let menu = <nav className={classes.Menu}>
                        <Header />
                        <ul>
                            {navItems}
                        </ul>
                        <Footer />
                    </nav>
                                         
             
        return <div>
            {menu}
        </div>
    } 
}

const mapStateToProps = state => {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps, null)(Menu);