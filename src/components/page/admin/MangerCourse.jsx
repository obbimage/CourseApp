import { Box, Grid, TextField } from "@mui/material";
import CardCourse from "./layout/CardCourse";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { getAllCourseNew, getCoursesByComplete } from "../../../api/course";
import { handleApiResponse } from "../../../api/instance";

export default function MangerCourse() {
    const [courses, setCourses] = useState([]);
    const [course1, setCourse1] = useState([]);

    useEffect(() => {

        getCoursesByComplete(true)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (courseResponse) => {
                        console.log(courseResponse)
                        setCourse1(courseResponse);
                    }
                )
            })
        getAllCourseNew(0, 5)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (responseCourse) => {
                        setCourses([
                            ...courses,
                            ...responseCourse.content,
                        ]);

                    }
                )
            });
    }, [])

    return (
        <LayoutAdmin>
            <LayoutHeaderAdmin>
                XÉT DUYỆT KHÓA HỌC
            </LayoutHeaderAdmin>
            <LayoutContentAdmin>
                <Box>
                    <TextField label="Tìm kiếm khóa học" />
                </Box>
            </LayoutContentAdmin>
            <LayoutContentAdmin>
                <Grid container spacing={2}>
                    {
                        course1.map((course) => {
                            return (
                                <Grid key={course.id} item xs={4} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                                    <CardCourse course={course} />
                                </Grid>
                            );
                        })
                    }
                    {
                        courses.map((course) => {
                            return (
                                <Grid key={course.id} item xs={4} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                                    <CardCourse course={course} />
                                </Grid>
                            );
                        })
                    }

                </Grid>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}