import { Button, List, ListItem, ListItemButton, Typography, styled } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const objNavLink = (name, url = '#') => {
    return ({ name, url });
};
const listCreateContent = [
    objNavLink("Quay phim & chỉnh sửa", "filmandedit"),
    objNavLink("Chương trình giảng dạy", "curriculum"), // chương trình giảng dạy

];
const listPublicCourse = [
    objNavLink("Trang tổng quan khóa học", "landingPage"),
    objNavLink("Định giá", "pricing"),
    // objNavLink("Tin nhắn khóa học")
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

const NavLinkStyled = styled(NavLink)(({ theme, isActive }) => ({
    // Các kiểu mặc định của bạn ở đây
    display: 'block',
    padding: theme.spacing(1),
    backgroundColor: isActive ? grey[200] : 'inherit', // Thay đổi màu dựa trên isActive
    // Các kiểu bổ sung
}));

const CustomLink = ({ children, to, isActive }) => {
    return (
        <NavLinkStyled to={to} isActive={isActive}>
            {children}
        </NavLinkStyled>
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

const ListItemCustom = ({ name }) => {
    return (
        <>
            <ListItem disablePadding>
                {/* <CircleCheck>
                    <CheckIcon sx={{ width: '80%' }} />
                </CircleCheck> */}
                <AddCircleOutlineOutlinedIcon/>
                <Typography sx={{marginLeft: '3px'}}>{name}</Typography>
            </ListItem>
        </>
    )
}

export default function EditNavbarCourse() {
    const theme = useTheme();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    return (
        <Box marginTop={theme.spacing(4)} marginRight={theme.spacing(4)} maxWidth={"260px"}>
            <Title>Lên kế hoạch cho khóa học của bạn</Title>
            {
                listPlantCourse.map((item) => {
                    return (
                        <CustomLink
                            isActive={location.pathname.includes(item.url)}
                            to={item.url}
                            key={item.name}>
                            <ListItemCustom
                                name={item.name} />
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
                                isActive={location.pathname.includes(item.url)}
                                key={item.name}
                                to={item.url}>
                                <ListItemCustom
                                    name={item.name} />
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
                                isActive={location.pathname.includes(item.url)}
                                key={item.name}
                                to={item.url}
                            >
                                <ListItemCustom
                                    name={item.name} />
                            </CustomLink>
                        )
                    })
                }
            </List>

            <Box>
                <Button variant="contained">
                    Gửi xét duyệt 
                </Button>
            </Box>
        </Box>
    )
}