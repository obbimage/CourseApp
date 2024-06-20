import { Box, Button, Card, CardActions, CardContent, CardMedia, Link, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export default function CardCourse({ course }) {
    const theme = useTheme();
    const [courseState, SetCourseState] = useState({});

    useEffect(() => {
        SetCourseState(course)
    }, [course])
    return (
        <>
            <Card sx={{ width: '100%',height:'300px', padding: theme.spacing(1) }} >
                <Box sx={{ display: 'flex' }}
                    component={Link}
                    href={`course/${courseState.id}/review`}
                >
                    <CardMedia
                        sx={{ width: '224px', height: 151 }}
                        // image={`${process.env.PUBLIC_URL}/imgs/cover.jpg`} />
                        image={`${courseState.img}`} />
                    <Box>
                        <CardContent sx={{}}>
                            <Typography component="div" variant="h6">
                                {courseState.name && courseState.name.length > 20 ? `${courseState.name.substring(0, 20)}...` : (courseState.name || 'undefined')}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Thể loại:  CNTT
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Thể loại con: Web
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Ngày tạo {courseState.dateUpload}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                tác giả: {`${courseState?.user?.lastName} ${courseState?.user?.firstName}`}
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