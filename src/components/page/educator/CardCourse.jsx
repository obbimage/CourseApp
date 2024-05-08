import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Link, Typography } from "@mui/material";
import { setStorageCourseId } from "../../../util/localStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const ChipComplete = (isComplete)=>{

//     return(
//         <>
//         <Chip
//             color={isComplete ? "success":"error"}
//             label={isComplete ? ""}
//         />
//         </>
//     )
// }

export default function CardCourse({ course }) {
    const navigate = useNavigate()

    const handleEdit = () => {
        let courseId = course.id;
        setStorageCourseId(courseId);
        navigate('edit');
    }

    return (
        // 345px
        <Card sx={{ width: '100%' }}>
            <CardMedia sx={{ height: 140 }}
                image={course.img || `${process.env.PUBLIC_URL}/imgs/cover.jpg`}
                title="image course" />
            <CardContent>
                <Box>
                    <Box sx={{
                        display: course.complete ? 'none' : 'inline-block'
                    }}>
                        <Chip
                            color="error"
                            label="Bản nháp"
                        />
                    </Box>
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                    {course.name || 'underfind'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ngày tạo:  {course.dateUpload}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {course.summary}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleEdit} size="small">Chỉnh Sửa</Button>
                <Button size="small">Chi tiết</Button>
            </CardActions>
        </Card>
    )
}