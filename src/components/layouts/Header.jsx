import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert'
import { useState } from "react";

const HeaderIconButton = ({ children, onClick }) => {
    return (
        <IconButton onClick={onClick} size="large" color="inherit" >
            {children}
        </IconButton>
    )
}

const HeaderBadge = ({ children, ariaHaspopup = "false", ariaControls = {}, onClick }) => {


    return (
        <Badge
            color="error"
            badgeContent={4}
            aria-haspopup={ariaHaspopup}
            aria-controls={ariaControls}
            onClick={onClick}>
            {children}
        </Badge>
    )
}
export default function Header({ onClickMenuIcon }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
        console.log(e.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My Account</MenuItem>
        </Menu>)
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ }}>
            <AppBar position="static"  sx={{ height: "60px" }} >
                <Toolbar>
                    <IconButton
                        onClick={onClickMenuIcon}
                        size="lagre"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                    variant="h6"
                    noWrap
                    component='div'>
                        Educator
                    </Typography>
                    <Box display="flex" flexGrow={1}>
                        {/* display pc */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                            <HeaderIconButton>
                                <HeaderBadge>
                                    <MailIcon />
                                </HeaderBadge>
                            </HeaderIconButton>
                            <HeaderIconButton>
                                <HeaderBadge>
                                    <NotificationsIcon />
                                </HeaderBadge>
                            </HeaderIconButton>
                            <HeaderIconButton
                                ariaControls={menuId}
                                ariaHaspopup="true"
                                onClick={handleProfileMenuOpen}>
                                <AccountCircle />
                            </HeaderIconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </Box>
    )
}