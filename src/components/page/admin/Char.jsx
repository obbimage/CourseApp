import { Box, Paper, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { handleApiResponse } from "../../../api/instance";
import { getAllEducator } from "../../../api/auth";

function Char() {
    const [countEducator, setCountEducator] = useState(0);
    const [educators, setEducators] = useState([]);
    useEffect(() => {
        getAllEducator()
            .then(response => {
                handleApiResponse(response,
                    handleApiResponse(response,
                        // success
                        (educatorsResponse) => {
                            console.log(educatorsResponse);
                        }
                    )
                )
            })
    }, [])
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
                    margin: 'auto',
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
                <Paper>
                    <Typography>Danh sách giảng viên</Typography>
                </Paper>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}

export default Char;