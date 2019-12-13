import React, {Component} from 'react';
import Header from '../Menu/Header/Header';
import Item from '../Menu/HigherOrderItems/Item/Item';
import classes from './Menu.css';
import * as items from '../../constants/Items';


class Menu extends Component {
    render() {
        const navArray = [];
        for(let item in items.menuItems) {
            navArray.push({
                navItem: items.menuItems[item]
            });
        }
        const navItems = navArray.map(item => {
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
                    </nav>
                                         
             
        return <div>
            {menu}
        </div>
    } 
}


export default Menu;