import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { setStorageCourseId } from "../../../util/localStorage";
import { useNavigate } from "react-router-dom";

export default function CardCourse({courseId, name }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        setStorageCourseId(courseId);
        navigate('edit');
    }
    return (
        // 345px
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia sx={{ height: 140 }}
                image={`${process.env.PUBLIC_URL}/imgs/cover.jpg`}
                title="image course" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name || 'underfind'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleEdit} size="small">Chỉnh Sửa</Button>
                <Button size="small">Chi tiết</Button>
            </CardActions>
        </Card>
    )
}