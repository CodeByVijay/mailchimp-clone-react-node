import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarSubMenu from './SidebarSubMenu';
import KeyIcon from '@mui/icons-material/Key';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CampaignIcon from '@mui/icons-material/Campaign';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DnsIcon from '@mui/icons-material/Dns';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SubjectIcon from '@mui/icons-material/Subject';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DraftsIcon from '@mui/icons-material/Drafts';
import WebIcon from '@mui/icons-material/Web';
import LayersIcon from '@mui/icons-material/Layers';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InterestsIcon from '@mui/icons-material/Interests';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Logo from '../Logo';


const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = ({ children }) => {
    // Logout Funtionality
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [refToken, setRefToken] = useState([]);

    const navigate = useNavigate();
    const pathname = useLocation().pathname
    const cookies = new Cookies();

    useEffect(() => {
        const refTokenData = cookies.get('refreshToken');
        setRefToken(refTokenData);
        if (refTokenData != undefined) {
            console.log(refTokenData);
        } else {
            navigate("/");
        }
    }, []);

    const handleLogout = async () => {
        try {
            const logOutdata = await axios.post('http://localhost:5000/logout', {
                "refToken": refToken
            });
            if (logOutdata.data.msg === 'logout success') {
                cookies.remove('refreshToken', { path: '/' })
                cookies.remove('accessToken', { path: '/' })
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Logout Funtionality End

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItems = [
       
        {
            path: "",
            name: "Email",
            icon: <EmailIcon />,
            subMenu: [
                {
                    path: "/admin/create/email/regular",
                    name: "Regular",
                    icon: <MarkEmailReadIcon fontSize="small" />
                },
                {
                    path: "/admin/create/email/plain-text",
                    name: "Plain Text",
                    icon: <SubjectIcon fontSize="small" />
                },
                {
                    path: "/admin/create/email/templetes",
                    name: "Templetes",
                    icon: <DraftsIcon fontSize="small" />
                }
            ]

        },
        
        {
            path: "admin/create/automations",
            name: "Automations",
            icon: <MotionPhotosAutoIcon />,
        },
        {
            path: "",
            name: "Website",
            icon: <LanguageIcon />,
            subMenu: [
                {
                    path: "/admin/create/website",
                    name: "Website",
                    icon: <LanguageIcon />
                },
                {
                    path: "/admin/create/website/domains",
                    name: "Domains",
                    icon: <DnsIcon />
                },
                {
                    path: "/admin/create/website/store",
                    name: "Store",
                    icon: <StoreIcon />
                }, {
                    path: "/admin/create/website/appointments",
                    name: "Appointments",
                    icon: <BookOnlineIcon />
                },
            ]
        },
        {
            path: "admin/create/landing-page",
            name: "Landing Page",
            icon: <WebIcon />,
        },
        {
            path: "/admin/create/creative-assistant",
            name: "Creative Assistant",
            icon: <LayersIcon />
        },
        {
            path: "",
            name: "Signup Form",
            icon: <IntegrationInstructionsIcon />,
            subMenu: [
                {
                    path: "/admin/create/setting/embedded-form",
                    name: "Embedded form",
                    icon: <ContactEmergencyIcon />
                },
                {
                    path: "/admin/create/setting/pop-up-form",
                    name: "Pop-up form",
                    icon: <CheckBoxOutlineBlankIcon />
                },
                {
                    path: "/admin/create/setting/signup-landing-page",
                    name: "Signup landing page",
                    icon: <SpeakerNotesIcon />
                },
            ]

        },
        {
            path: "/admin/create/surverys",
            name: "Surveys",
            icon: <ViewDayIcon />
        },
        {
            path: "",
            name: "Ad",
            icon: <AdUnitsIcon />,
            subMenu: [
                {
                    path: "/admin/create/ad/facebook-instagram-ad",
                    name: "Facebook / Instagram ad",
                    icon: <FacebookIcon />
                },
                {
                    path: "/admin/create/ad/google-remarketing-ad",
                    name: "Google remarketing ad",
                    icon: <GoogleIcon />
                },
            ]

        },
        {
            path: "/admin/create/social-post",
            name: "Social Post",
            icon: <InterestsIcon />
        },
        {
            path: "",
            name: "Postcard",
            icon: <MailOutlineIcon />,
            subMenu: [
                {
                    path: "/admin/cretate/postcard/one-time-send",
                    name: "One-time send",
                    icon: <MarkAsUnreadIcon />
                },
                {
                    path: "/admin/create/postcard/recurring",
                    name: "Recurring",
                    icon: <DynamicFeedIcon />
                },
                {
                    path: "/admin/create/postcard/abandoned-cart",
                    name: "Abandoned cart",
                    icon: <LocalShippingIcon />
                },
            ]

        },
    ]

    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    return (
        <>
            <CssBaseline />
            {/* <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Account Logout">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile Image" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={handleLogout} textAlign="center">Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar> */}


            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Link to="../admin/dashboard" title='Exit' className='createSidebar'><ChevronLeftIcon /> 
                    <Typography variant="p" component="div">
                        <Logo/>
                    </Typography>
                    </Link>
                    
                    {/* <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton> */}
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((menu, index) => {
                        const clickMenu = () => {
                            navigate(menu.path)
                        }
                        //  () => navigate(menu.path)
                        if (menu.subMenu) {
                            return (
                                <SidebarSubMenu menu={menu} open={open} key={menu.name} />
                            )
                        }
                        return (
                            <>

                                <ListItem onClick={clickMenu} key={menu.name} disablePadding className={`${pathname === menu.path ? 'active' : ''}`} sx={{ display: 'block' }}>
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
                                        >
                                            {menu.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={menu.name} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>

                        )
                    })}
                </List>

            </Drawer>
            <main>{children}</main>

        </>
    )
}

export default Sidebar
