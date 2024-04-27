import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import Search from "../../layouts/Search";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import CardCourse from "./CardCourse";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getCourseByUserId } from "../../../api/course";
import { CurrentUserContext } from "../../../App";

function itemSelectMenu(key, value) {
    return { key, value }
}
export default function EducatorCourse() {
    // context
    const theme = useTheme();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [courses, setCourses] = useState([]);
    const [sort, setSort] = useState("");

    const listFillterMenu = [
        itemSelectMenu("Mới nhất", 'new'),
        itemSelectMenu("Cũ nhất", "old"),
        itemSelectMenu("A-Z", "ascending"), // tăng dần
        itemSelectMenu("Z-A", "decrease"),// giảm dần
    ]

    useEffect(() => {
        getCourseByUserId(currentUser.id)
            .then((response) => {
                if (response.status === 200) {
                    const listCourse = response.data.data;
                    setCourses(listCourse);
                }
            })
    }, [currentUser.id]);

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
                {
                    courses.map((course) => {
                        return (
                            <Box key={course.id} sx={{ margin: '15px' }}>
                                {/* <Link to="edit"> */}
                                <CardCourse
                                    courseId={course.id}
                                    name={course.name}
                                />
                                {/* </Link> */}
                            </Box>
                        )
                    })
                }

            </Box>
        </Box>
    )
}