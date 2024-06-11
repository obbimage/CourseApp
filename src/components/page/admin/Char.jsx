import { Box, Card, CardContent, CardMedia, Paper, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { handleApiResponse } from "../../../api/instance";
import { getAllEducator } from "../../../api/auth";
import AvatarCustom from "../../layouts/AvatarCustom";

function Char() {
    const theme = useTheme();
    const [countEducator, setCountEducator] = useState(0);
    const [educators, setEducators] = useState([]);
    useEffect(() => {
        getAllEducator()
            .then(response => {
                handleApiResponse(response,
                    handleApiResponse(response,
                        // success
                        (educatorsResponse) => {
                            setEducators(educatorsResponse);
                        }
                    )
                )
            })
    }, [])
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
                    {educators.map((user) => {
                        return (
                            <Card key={user.id}>
                                <CardContent>
                                    <Box sx={{width: theme.spacing(3)}}>
                                        <AvatarCustom
                                            src={user.avatar}
                                            name={user.firstName || user.username}
                                        />
                                    </Box>
                                </CardContent>
                                {user.lastName} {user.firstName}
                            </Card>
                        )
                    })}
                </Paper>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}

export default Char;