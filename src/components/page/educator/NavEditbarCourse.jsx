import { List, ListItem, ListItemButton, Typography, styled } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";

const objNavLink = (name, url = '#') => {
    return ({ name, url });
};
const listCreateContent = [
    objNavLink("Quay phim & chỉnh sửa", "filmandedit"),
    objNavLink("Chương trình giảng dạy", "curriculum"), // chương trình giảng dạy

];
const listPublicCourse = [
    objNavLink("Trang tổng quan khóa học","landingPage"),
    objNavLink("Định giá","pricing"),
    objNavLink("Tin nhắn khóa học")
];

const listPlantCourse = [
    objNavLink("Học viên mục tiêu", "intended"),
    objNavLink("Cấu trúc khóa học", "structure"),
    objNavLink("Thiết lập studio và thử nghiệm", "setupStudio")
];

const CircleCheck = styled('span')
    (({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
        marginRight: theme.spacing(1),
        border: '1px solid black',
        borderRadius: '50%'

    }));


const CustomLink = ({ children, to }) => {
    return (
        <Link to={to} >
            {children}
        </Link>
    );
}

const Title = ({ children }) => {

    return (
        <Typography variant="h6" sx={{
            fontWeight: '500'
        }}>
            {children}
        </Typography>
    )
}

export default function EditNavbarCourse() {
    const theme = useTheme();
    return (
        <Box marginTop={theme.spacing(4)} marginRight={theme.spacing(4)} maxWidth={"260px"}>
            <Title>Lên kế hoạch cho khóa học của bạn</Title>
            {
                listPlantCourse.map((item) => {
                    return (
                        <CustomLink
                            to={item.url}
                            key={item.name}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ display: 'flex', alignItems: 'center', px: '0' }}>
                                    <CircleCheck>
                                        <CheckIcon sx={{ width: '80%' }} />
                                    </CircleCheck>
                                    <Typography>{item.name}</Typography>
                                </ListItemButton>
                            </ListItem>
                        </CustomLink>
                    )
                })
            }
            <Title>Tạo nội dung của bạn</Title>
            <List>
                {
                    listCreateContent.map((item) => {
                        return (
                            <CustomLink
                                key={item.name}
                                to={item.url}>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ display: 'flex', alignItems: 'center', px: '0' }}>
                                        <CircleCheck>
                                            <CheckIcon sx={{ width: '80%' }} />
                                        </CircleCheck>
                                        <Typography>{item.name}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </CustomLink>
                        )
                    })
                }
            </List>
            <Title>Xuất bản khóa học của bạn</Title>
            <List>
                {
                    listPublicCourse.map((item) => {
                        return (
                            <CustomLink
                                key={item.name}
                                to={item.url}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ display: 'flex', alignItems: 'center', px: '0' }}>
                                        <CircleCheck>
                                            <CheckIcon sx={{ width: '80%' }} />
                                        </CircleCheck>
                                        <Typography>{item.name}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </CustomLink>
                        )
                    })
                }
            </List>
        </Box>
    )
}