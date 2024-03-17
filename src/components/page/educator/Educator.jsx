import { Box } from "@mui/material";

import { useState } from "react";
import Header from "../../layouts/Header";
import NavigationBar from "../../layouts/NavigationBar";
import EducatorProfile from "./EducatorProfile";
import { Outlet } from "react-router-dom";


export default function Educator() {
    const [openNavgationBar, setOpenNavgatioBar] = useState(false);
    const handleToggleNavbar = () => {
        setOpenNavgatioBar(!openNavgationBar);
    }

    const handleOnMouseEnter =  ()=>{
        setOpenNavgatioBar(true);
    }

    const handleOnMuoseLeave = ()=>{
        setOpenNavgatioBar(false);
    }
    const handleMenuIcon = () => {
        setOpenNavgatioBar(true);
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
            <NavigationBar
                open={openNavgationBar}
                // handleToggle={handleToggleNavbar}
                handleOnMouseEnter={handleOnMouseEnter}
                handleOnMuoseLeave={handleOnMuoseLeave}
            />
            <Box display='flex' flexDirection='column' flexGrow={1}>
                <Header
                    onClickMenuIcon={handleMenuIcon}
                ></Header>
                <Box flexGrow={1}>
                    {/* <EducatorProfile /> */}
                    <Outlet/>
                </Box>
            </Box>


        </Box>
    )
}