import { Box } from "@mui/material";
import Header from "../../layouts/Header";
import { Outlet } from "react-router-dom";
import NavigationBarAdmin from "./layout/NavigationBarAdmin";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";

export default function AdminPage() {

    const [openNavigationBar, setOpenNavigationBar] = useState(false);

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const handleToggleNavbar = () => {
        setOpenNavigationBar(!openNavigationBar);
    }

    const handleOnMouseEnter = () => {
        setOpenNavigationBar(true);
    }

    const handleOnMouseLeave = () => {
        
        setOpenNavigationBar(false);
    }
    const handleMenuIcon = () => {
        setOpenNavigationBar(true);
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%'
        }}>
            <NavigationBarAdmin
                open={openNavigationBar}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
            }}>
                <Header
                    name={"ADMIN"} />
                <Box flexGrow={1}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}