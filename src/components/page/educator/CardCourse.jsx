import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function CardCourse() {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }}
                image={`${process.env.PUBLIC_URL}/imgs/cover.jpg`}
                title="image course" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Tên Môn Học
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Chỉnh Sửa</Button>
                <Button size="small">Chi tiết</Button>
            </CardActions>
        </Card>
    )
}