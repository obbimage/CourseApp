import { Box, Paper, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { getAllEducator } from "../../../api/educator";
import { handleApiResponse } from "../../../api/instance";

function Char() {
    const [countEducator,setCountEducator] = useState(0);
    useEffect(()=>{
        getAllEducator()
        .then(response=>{
            handleApiResponse(response,
                // success
                (educatorResponse)=>{
                    setCountEducator(educatorResponse.length);
                }
            )
        })
    },[])
    const theme = useTheme();
    return (
        <LayoutAdmin>
            <LayoutHeaderAdmin>
                Tổng quan
            </LayoutHeaderAdmin>
            <LayoutContentAdmin>
                <Paper sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '500px',
                    margin:'auto',
                    padding: theme.spacing(1),
                }}>
                    <Box>
                        <Typography>Tổng doanh thu</Typography>
                        <Typography fontSize={'20px'}>0 VND</Typography>
                        <Typography>0 VND tháng này</Typography>
                    </Box>
                    <Box>
                        <Typography>Tổng giảng viên</Typography>
                        <Typography fontSize={'20px'}>{countEducator} Đăng ký</Typography>
                        <Typography>{countEducator} đăng ký tháng này</Typography>
                    </Box>
                </Paper>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}

export default Char;