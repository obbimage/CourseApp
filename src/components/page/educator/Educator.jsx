import { Box } from "@mui/material";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";
import NavigationBar from "../../layouts/NavigationBar";


export default function Educator() {
    const [openNavigationBar, setOpenNavigationBar] = useState(false);


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
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
            <NavigationBar
                open={openNavigationBar}
                handleOnMouseEnter={handleOnMouseEnter}
                handleOnMouseLeave={handleOnMouseLeave}
            />
            <Box display='flex' flexDirection='column' flexGrow={1}>
                <Header
                    name={"EDUCATOR"}
                    onClickMenuIcon={handleMenuIcon}
                ></Header>
                <Box flexGrow={1}>
                    {/* <EducatorProfile /> */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}