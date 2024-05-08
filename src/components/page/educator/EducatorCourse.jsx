import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import Search from "../../layouts/Search";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import CardCourse from "./CardCourse";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getCourseByUserId } from "../../../api/course";
import { CurrentUserContext } from "../../../App";
import { handleApiResponse } from "../../../api/instance";

function itemSelectMenu(id, name) {
    return { id, name }
}
export default function EducatorCourse() {
    // context
    const theme = useTheme();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [courses, setCourses] = useState([]);
    const [sort, setSort] = useState("");

    const listFilterMenu = [
        itemSelectMenu(1, "Mới nhất"),
        itemSelectMenu(2, "Cũ nhất"),
        itemSelectMenu(3, "A-Z"), // tăng dần
        itemSelectMenu(4, "Z-A"),// giảm dần
    ]

    useEffect(() => {
        getCourseByUserId(currentUser.id)
            .then(response => {
                handleApiResponse(response,
                    (coursesResponse) => {
                        setCourses(coursesResponse);
                    }
                )
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
                    <DropDownMenu
                        value={listFilterMenu}
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
                            <Box key={course.id} sx={{ margin: '15px', width: '300px' }}>
                                {/* <Link to="edit"> */}
                                <CardCourse
                                    course={course}
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