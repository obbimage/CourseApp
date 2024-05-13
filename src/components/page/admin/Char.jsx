import { Box, Paper, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";

function Char() {
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
                        <Typography fontSize={'20px'}>0 Đăng ký</Typography>
                        <Typography>0 đăng ký tháng này</Typography>
                    </Box>
                </Paper>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}

export default Char;