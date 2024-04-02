import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import Search from "../../layouts/Search";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import CardCourse from "./CardCourse";
import { Link } from "react-router-dom";
import { useState } from "react";

function itemSelectMenu(key, value) {
    return { key, value }
}
export default function EducatorCourse() {
    const theme = useTheme();
    const [sort, setSort] = useState("");
    const listFillterMenu = [
        itemSelectMenu("Mới nhất", 'new'),
        itemSelectMenu("Cũ nhất", "old"),
        itemSelectMenu("A-Z", "ascending"), // tăng dần
        itemSelectMenu("Z-A", "decrease"),// giảm dần
    ]

    const handleSelectSort = (value) => {
        setSort(value);
    }

    return (
        <Box sx={{
            margin: '10px 40px'
        }}>
            <Typography sx={{
                fontSize: theme.spacing(4),
                fontWeight: '600'
            }}>Khóa học</Typography>
            {/* tìm kiếm và tạo khóa học */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px 0px 20px  ',
                height: '50px'
            }}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Search />
                    <DropDownMenu ListItem={listFillterMenu}
                        onChange={handleSelectSort} />
                </Box>
                <Link to="create" sx={{ height: '100%' }}>
                    <Button
                        sx={{ height: '100%' }}
                        variant="contained">Khóa học mới</Button>
                </Link>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', margin: '0 -10px' }}>
                <Box sx={{ margin: '10px' }}>
                    <Link to="edit">
                        <CardCourse />
                    </Link>
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
                <Box sx={{ margin: '10px' }}>
                    <CardCourse />
                </Box>
            </Box>
        </Box>
    )
}