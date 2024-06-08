import { Box, Button, CircularProgress, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseList from "./courseList";
import { getAllcourseBuy } from "../../../../api/course";
import { handleApiResponse } from "../../../../api/instance";

export default function StorageCourse() {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getAllcourseBuy()
            .then(response => {
                handleApiResponse(response,
                    // success
                    (coursesResponse) => {
                        setCourses(coursesResponse);
                        console.log(coursesResponse)
                        setIsLoading(false);
                    }
                )
            })
    }, [])
    return (
        <Box sx={{ mt: "20px", minHeight: { xs: "770px", sm: "620px" } }}>
            <Box
                sx={{
                    display: { xs: "block", sm: "flex" },
                    alignItems: "center",
                }}
            >
                <Button
                    sx={{ display: { xs: "none", sm: "flex" } }}
                    component={Link}
                    to="/"
                >
                    <KeyboardArrowLeftIcon /> Quay lại
                </Button>
            </Box>
            <Box>
                {/* <Typography sx={{ fontWeight: '500' }}>
                    Khóa học đã đăng ký
                </Typography> */}
            </Box>
            <CourseList
                isNew={false}
                title={"Khóa học"}
                isPrice={false}
                isStuded={false}
                value={courses}
            />
            {
                isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            mt: "24px",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )
            }
        </Box>
    )
}