import { Box, Typography, styled, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../../theme";

const objNavLink = (name, url = '#') => {
    return ({ name, url });
}
const listCreateContent = [
    objNavLink("Quay phim & chỉnh sửa"),
    objNavLink("Chương trình giảng dạy"),

]

const CircleCheck = styled('span')
    (({ theme }) => ({
        width: theme.spacing(2),
        height: theme.spacing(2),
        marginRight:theme.spacing(1),
        border: '1px solid black',
        borderRadius: '50%'

    }))

export default function EditCourse() {
    const theme = useTheme();

    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Box>
                <Typography>Tạo nội dung của bạn</Typography>
                {
                    listCreateContent.map((item) => {
                        return (
                            <Link
                                key={item.name}>
                                <Box sx={{ display: 'flex',alignItems:'center' }}>
                                    <CircleCheck></CircleCheck>
                                    <Typography>{item.name}</Typography>
                                </Box>
                            </Link>
                        )
                    })
                }
                <Typography>Xuất bản khóa học của bạn</Typography>
            </Box>
        </Box>
    );
}