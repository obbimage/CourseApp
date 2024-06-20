import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
// icon
import { AccountBox, InsertChart, LocalLibrary } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import StorageIcon from '@mui/icons-material/Storage';
import FolderIcon from '@mui/icons-material/Folder';
import { Link, useNavigate } from 'react-router-dom';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import { clearToken } from '../../../../hook/token';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../App';
import AvatarCustom from '../../../layouts/AvatarCustom';

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.down('lg')]: {
        position: 'fixed',
        'z-index': 1,
    }
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down('laptop')]: {
        width: '0px',

    }
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        height: '100%',
        ' .MuiDrawer-paper': {
            position: 'static',
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        })
    }),
);

const itemNav = (name, iconComponent, url) => {
    return { name, iconComponent, url };
}

const listItemNavAccount = [
    itemNav("Hồ sơ", <AccountBox />, "profile"),
];

const listItemNavCourse = [
    itemNav("Dữ liệu", <StorageIcon />, "data"),
    itemNav("Duyệt khóa học", <FolderIcon />, "course"),
    itemNav("Thống kê", <InsertChart />, "char")

]
const ItemComponent = ({ listItem, open }) => {
    return (
        listItem.map((item, index) => {
            return (
                <Link key={index} to={item.url}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        margin: 0,
                        textDecoration: 'none',
                        color: 'inherit'

                    }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {item.iconComponent}
                        </ListItemIcon>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                            {item.name}
                        </ListItemText>
                    </ListItemButton>
                </Link>
            );
        })
    );
}

function ListCustom() {
    const [open, setOpen] = useState(false);
    const handleToggleOpen = () => {
        setOpen(!open);
    }
    return (
        <>
            <List>
                <ListItemButton onClick={handleToggleOpen}>
                    <ListItemIcon>
                        <ContactPhoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Khách hàng" />
                    {
                        open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
                    }
                </ListItemButton>
            </List>
            <Collapse in={open} unmountOnExit>
                <List>
                    <Link to={"educator"}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <SchoolOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Educator" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
        </>
    )
}
export default function NavigationBarAdmin({ handleToggle, onMouseEnter, onMouseLeave }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [openState, setOpenState] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogOut = () => {
        setCurrentUser({})
        clearToken();
        navigate("/login/admin")
    }
    const handleOnMouseEnter = () => {
        if (onMouseEnter) {
            onMouseEnter();
        }
    }
    const handleOnMouseLeave = () => {
        if (onMouseLeave) {
            onMouseLeave();
        }
    }
    return (
        <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <Drawer variant="permanent" open={openState}>
                <DrawerHeader>
                    <Box flexGrow={1} display={openState ? 'flex' : 'none'} justifyContent='flex-start'>
                        <Box sx={{
                            width: '45px',
                            height: '45px',
                        }}>

                            <AvatarCustom src={currentUser.avatar} name={`${currentUser.lastName} ${currentUser.firstName}`} />
                        </Box>
                        <Box sx={{
                            marginLeft: theme.spacing(1)
                        }}>
                            <Typography fontSize="13px" variant='subtitle1'>Xin chào!</Typography>
                            <Typography fontSize='15px' variant='subtitle2'>{currentUser.lastName} {currentUser.firstName}</Typography>
                        </Box>
                    </Box>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block', color: 'inherit' }} >
                        <ItemComponent
                            open={openState}
                            listItem={listItemNavCourse} />
                    </ListItem>
                </List>
                <Divider />
                <ListCustom />
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }} >
                        <ItemComponent
                            open={openState}
                            listItem={listItemNavAccount} />
                        <ListItemButton
                            onClick={handleLogOut}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Đăng xuất
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </div >
    )
}