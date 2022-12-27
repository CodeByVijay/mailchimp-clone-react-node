import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Divider } from '@mui/material';

const SidebarSubMenu = ({ menu, open }) => {
    const navigate = useNavigate()
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [activeClass, setActiveClass] = useState(false);
    const toggleMenu = () => setisMenuOpen(!isMenuOpen);
    return (
        <>
            <List>
                <div className="menu_container">
                    <ListItem key={menu.name} disablePadding sx={{ display: 'block' }} onClick={toggleMenu} style={{backgroundColor:isMenuOpen?'yellow':'',color:isMenuOpen?'green':''}} className="subMenuIcon">
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                style={{color:isMenuOpen?'green':''}}
                            >
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <div className="svgIcon">
                            {open && (isMenuOpen?<ArrowDropDown/>:<ArrowRight/>)}
                        </div>
                    </ListItem>
                </div>
                {
                    isMenuOpen && (<div className='subMenuContainer'>{
                        menu.subMenu.map((submenu, index) => {
                            return (
                                <>
                                    <ListItem key={submenu.name} disablePadding sx={{ display: 'block' }} onClick={toggleMenu}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                            onClick={() => navigate(submenu.path)}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {submenu.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={submenu.name} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                        })
                    }</div>)
                }
            </List>
        </>
    )
}

export default SidebarSubMenu
