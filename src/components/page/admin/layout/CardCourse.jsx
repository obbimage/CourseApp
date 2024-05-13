import { Box, Button, Card, CardActions, CardContent, CardMedia, Link, Typography, useTheme } from "@mui/material";

export default function CardCourse() {
    const theme = useTheme();

    return (
        <>
            <Card sx={{width:'520px',padding: theme.spacing(1)}} >
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        sx={{ width: '224px', height: 151 }}
                        // image={`${process.env.PUBLIC_URL}/imgs/cover.jpg`} />
                        image={`https://img-c.udemycdn.com/course/240x135/5502286_9c3c_2.jpg`} />
                    <Box>
                        <CardContent sx={{}}>
                            <Typography component="div" variant="h5">
                            HTML/CSS cho người mới bắt đầu 2023
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                               Thể loại:  CNTT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Thể loại con: Web
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                               Ngày tạo 01/01/2023
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                tác giả: Thúy Nguyễn
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
                {/* <CardActions>
                    <Link>
                        <Button>
                            Xem chi Tiết
                        </Button>
                    </Link>
                </CardActions> */}
            </Card>
        </>
    )
}