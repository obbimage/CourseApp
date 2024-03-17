import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import AvatarLetter from './AvatarLetter';
// icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AccountBox, LocalLibrary } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
    itemNav("Đăng xuất", <LogoutIcon />, "logout")
];

const listItemNavCourse = [
    itemNav("Khóa học", <LocalLibrary />, "course")
]
const ItemComponent = ({ listItem, open }) => {
    return (
        listItem.map((item) => {
            return (
                <Link to={item.url}
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
export default function NavigationBar({ open, handleToggle, handleOnMouseEnter, handleOnMuoseLeave }) {
    const theme = useTheme();

    // const handleOnMouseEnter = (e) =>{
    //     handleToggle();
    // }
    return (
        <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMuoseLeave}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Box flexGrow={1} display={open ? 'flex' : 'none'} justifyContent='flex-start'>
                        <Box sx={{
                            width: '45px',
                            height: '45px'
                        }}>
                            <AvatarLetter name='Sinh Tiến' />
                        </Box>
                        <Box sx={{
                            marginLeft: theme.spacing(1)
                        }}>
                            <Typography fontSize="13px" variant='subtitle1'>Xin chào!</Typography>
                            <Typography fontSize='15px' variant='subtitle2'>Sinh Tiến</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleToggle}>
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block',color:'inherit'}} >
                        <ItemComponent
                            open={open}
                            listItem={listItemNavCourse} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }} >
                        <ItemComponent
                            open={open}
                            listItem={listItemNavAccount} />
                    </ListItem>
                </List>
            </Drawer>
        </div >
    )
}