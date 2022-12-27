import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import Groups3Icon from '@mui/icons-material/Groups3';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SidebarSubMenu from './SidebarSubMenu';
import KeyIcon from '@mui/icons-material/Key';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CampaignIcon from '@mui/icons-material/Campaign';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import GridViewIcon from '@mui/icons-material/GridView';
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import StyleIcon from '@mui/icons-material/Style';
import SegmentIcon from '@mui/icons-material/Segment';
import PollIcon from '@mui/icons-material/Poll';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ReportIcon from '@mui/icons-material/Report';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DnsIcon from '@mui/icons-material/Dns';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AssistantIcon from '@mui/icons-material/Assistant';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import InventoryIcon from '@mui/icons-material/Inventory';
import DockIcon from '@mui/icons-material/Dock';
import InstagramIcon from '@mui/icons-material/Instagram';
import FitbitIcon from '@mui/icons-material/Fitbit';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WifiFindIcon from '@mui/icons-material/WifiFind';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CreateIcon from '@mui/icons-material/Create';
import Logo from './Logo';


const drawerWidth = 240;

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
            path: "/admin/create",
            name: "Create",
            icon: <CreateIcon color="primary" />
        },
        {
            path: "/admin/campaign",
            name: "Campaigns",
            icon: <CelebrationIcon />,
            subMenu: [
                {
                    path: "/admin/campaigns/all-campaigns",
                    name: "All Campaigns",
                    icon: <CampaignIcon fontSize="small" />
                },
                {
                    path: "/admin/campaigns/email-templetes",
                    name: "Email Templetes",
                    icon: <EmailIcon fontSize="small" />
                }
            ]

        },
        {
            path: "",
            name: "Audience",
            icon: <Groups3Icon />,
            subMenu: [
                {
                    path: "/admin/audience/audience-dashboard",
                    name: "Audience Dashboard",
                    icon: <GridViewIcon />
                },
                {
                    path: "/admin/audience/all-contacts",
                    name: "All contacts",
                    icon: <ContactsIcon />
                },
                {
                    path: "/admin/audience/signup-forms",
                    name: "Signup forms",
                    icon: <DynamicFormIcon />
                },
                {
                    path: "/admin/audience/tags",
                    name: "Tags",
                    icon: <StyleIcon />
                },
                {
                    path: "/admin/audience/segments",
                    name: "Segments",
                    icon: <SegmentIcon />
                },
                {
                    path: "/admin/audience/surveys",
                    name: "Surveys",
                    icon: <PollIcon />
                },
                {
                    path: "/admin/audience/inbox",
                    name: "Inbox",
                    icon: <AllInboxIcon />
                },
            ]

        },
        {
            path: "",
            name: "Automations",
            icon: <MotionPhotosAutoIcon />,
            subMenu: [
                {
                    path: "/admin/automations/overview",
                    name: "Overview",
                    icon: <AccountTreeIcon />
                },
                {
                    path: "/admin/automations/all-journeys",
                    name: "All journeys",
                    icon: <EmojiTransportationIcon />
                },
                {
                    path: "/admin/automations/pre-built-journeys",
                    name: "Pre-built journeys",
                    icon: <DirectionsTransitIcon />
                },
                {
                    path: "/admin/automations/transactional-email",
                    name: "Transactional email",
                    icon: <AttachEmailIcon />
                }
            ]
        },
        {
            path: "",
            name: "Analytics",
            icon: <AnalyticsIcon />,
            subMenu: [
                {
                    path: "/admin/analytics/email",
                    name: "Email",
                    icon: <EmailIcon />
                },
                {
                    path: "/admin/analytics/reports",
                    name: "Reports",
                    icon: <ReportIcon />
                }
            ]
        },
        {
            path: "",
            name: "Website",
            icon: <LanguageIcon />,
            subMenu: [
                {
                    path: "/admin/website/website",
                    name: "Website",
                    icon: <LanguageIcon />
                },
                {
                    path: "/admin/website/store",
                    name: "Store",
                    icon: <StoreIcon />
                }, {
                    path: "/admin/website/appointments",
                    name: "Appointments",
                    icon: <BookOnlineIcon />
                },
                {
                    path: "/admin/website/domains",
                    name: "Domains",
                    icon: <DnsIcon />
                },
                {
                    path: "/admin/website/settings",
                    name: "Settings",
                    icon: <SettingsApplicationsIcon />
                },
                {
                    path: "/admin/website/reports",
                    name: "Reports",
                    icon: <ReportIcon />
                }
            ]
        },
        {
            path: "",
            name: "Content",
            icon: <FileCopyIcon />,
            subMenu: [
                {
                    path: "/admin/content/creative-assistant",
                    name: "Creative Assistant",
                    icon: <AssistantIcon />
                },
                {
                    path: "/admin/content/my-files",
                    name: "My files",
                    icon: <AddToDriveIcon />
                }, {
                    path: "/admin/content/products",
                    name: "Products",
                    icon: <InventoryIcon />
                },
                {
                    path: "/admin/content/giphy",
                    name: "Giphy",
                    icon: <DockIcon />
                },
                {
                    path: "/admin/content/instagram",
                    name: "Instagram",
                    icon: <InstagramIcon />
                },
                {
                    path: "/admin/content/my-logo",
                    name: "My logo",
                    icon: <FitbitIcon />
                }
            ]
        },
        {
            path: "",
            name: "Integration",
            icon: <IntegrationInstructionsIcon />,
            subMenu: [
                {
                    path: "/admin/integration/discover",
                    name: "Discover",
                    icon: <WifiFindIcon />
                },
                {
                    path: "/admin/integration/manage",
                    name: "Manage",
                    icon: <ManageHistoryIcon />
                }, {
                    path: "/admin/integration/add-new",
                    name: "Add new",
                    icon: <FiberNewIcon />
                }
            ]
        },
        {
            path: "/admin/search",
            name: "Search",
            icon: <ManageSearchIcon />
        },
        {
            path: "",
            name: "Setting",
            icon: <SettingsIcon />,
            subMenu: [
                {
                    path: "/admin/setting/profile",
                    name: "Profile",
                    icon: <AdminPanelSettingsIcon />
                },
                {
                    path: "/admin/setting/password-change",
                    name: "Account Password",
                    icon: <KeyIcon />
                },
            ]

        },

    ]

    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
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
                            {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}


                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={handleLogout} textAlign="center">Logout</Typography>
                            </MenuItem>


                        </Menu>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                  <div className="mainDashLogo">
                 <Link to="../admin/dashboard" title='Dashboard'> <Logo/></Link>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                  </div>
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

                                <ListItem onClick={clickMenu} key={menu.name} disablePadding sx={{ display: 'block' }}>
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
