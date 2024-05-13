import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Tooltip, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./LayoutAdmin";
import Video from "../../../video/Video";
import { Children } from "react";
import { Block, Height } from "@mui/icons-material";
import AvatarCustom from "../../../layouts/AvatarCustom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { grey } from "@mui/material/colors";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const Title = ({ children }) => {
    return (
        <Typography sx={{
            fontWeight: '600',
            fontSize: '20px'
        }}>{children}</Typography>
    )
}
const Title1 = ({ children }) => {
    return (
        <Typography sx={{
            fontWeight: '600'
        }}>{children}</Typography>
    )
}
const Content = ({ children }) => {

    return (
        <Typography>
            {children}
        </Typography>
    )
}

const BlockInfoCourse = ({ children }) => {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            my: theme.spacing(1)
        }}>
            {children}
        </Box>
    )
}
const BlockInfoRightCourse = ({ children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ width: '75%', paddingRight: theme.spacing(25) }}>
            <Content>{children}</Content>
        </Box>
    )
}
const BlockInfoLeftCourse = ({ children }) => {
    return (
        <Box sx={{ width: '25%' }}>
            <Content>{children}</Content>
        </Box>
    )
}

const UnitList = ({ value }) => {
    const unit = value;

    const theme = useTheme();
    return (
        <Accordion sx={{
            width: '100%',
            '&.Mui-expanded': {
                margin: '0',
            }
        }}>
            <AccordionSummary sx={{
                width: '100%',
                py: theme.spacing(1),
                backgroundColor: grey[200],
            }}
                expandIcon={<ArrowDropDownIcon />}>
                <Content>Phần {unit?.numberUnit}: {unit?.name}</Content>
            </AccordionSummary>
            <SectionList
                value={{
                    numberSection: 1,
                    name: 'HTML là gì và cài đặt môi trường'

                }}
            />
            <SectionList
                value={{
                    numberSection: 2,
                    name: 'Syntax và quy tắc code HTML'

                }}
            />
            <SectionList
                value={{
                    numberSection: 3,
                    name: 'HTML thẻ img ảnh và a để link url'

                }}
            />
            <SectionList
                value={{
                    numberSection: 4,
                    name: 'HTML table Tag - Vẽ bảng biểu trên web'

                }}
            />
            <SectionList
                value={{
                    numberSection: 5,
                    name: 'HTML List Tag - ul, ol, dl để làm menu, danh sách'

                }}
            />
            <SectionList
                value={{
                    numberSection: 6,
                    name: 'HTML là gì và cài đặt môi trường'

                }}
            />
            <SectionList
                value={{
                    numberSection: 7,
                    name: 'HTML block tag - thẻ div, span chia khối'

                }}
            />
            <SectionList
                value={{
                    numberSection: 8,
                    name: 'HTML iframe tag - nhúng nội dung website khác vào web'

                }}
            />
            <SectionList
                value={{
                    numberSection: 9,
                    name: 'HTML Symbols - Ký hiệu đặc biệt trên web'

                }}
            />
            <SectionList
                value={{
                    numberSection: 10,
                    name: 'HTML Layout - Phân chia giao diện thành phần riêng lẻ'

                }}
            />
            <SectionList
                value={{
                    numberSection: 11,
                    name: 'HTML các thẻ form cơ bản hay dùng'

                }}
            />
        </Accordion>
    )
};
const SectionList = ({ value }) => {
    const theme = useTheme();
    const section = value;
    return (
        <>
            <AccordionDetails sx={{
                py: theme.spacing(0.5)
            }} >
                <Button sx={{
                    textTransform: 'none',
                    color: 'inherit',
                    textAlign: 'left'
                }}
                    startIcon={<PlayCircleOutlineIcon />}>
                    <Content>{section.numberSection}. {section.name}</Content>
                </Button>
            </AccordionDetails>
        </>
    )
}
export default function DetailsCourse() {
    const theme = useTheme();

    return (
        <LayoutAdmin>
            <LayoutHeaderAdmin>
                XÉT DUYỆT KHÓA HỌC
            </LayoutHeaderAdmin>
            <Box sx={{
                marginTop: 0,
                px: 0
            }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '75%' }}>
                        <Box sx={{ height: '656px', marginBottom: theme.spacing(1) }}>
                            <Video
                                source={"D:\Users\sinht\Downloads\video.mp4"} />
                        </Box>
                        <Box>
                            <Box>
                                <Title>HTML/CSS cho người mới bắt đầu 2023</Title>
                                <Content>Khóa học này cung cấp cho bạn kiến thức nền tảng về HTML và CSS,
                                    hai ngôn ngữ lập trình cốt lõi để xây dựng trang web</Content>
                            </Box>
                            <Divider />
                            <Box>
                                <BlockInfoCourse>
                                    <BlockInfoLeftCourse>Mô tả</BlockInfoLeftCourse>
                                    <BlockInfoRightCourse>
                                        Khóa học là lựa chọn tốt cho những ai muốn bắt đầu học lập trình web với việc tìm hiểu thiết kế giao diện gồm 2 thành phần chính là HTML và CSS
                                        Khóa học này cung cấp cho bạn kiến thức nền tảng về HTML và CSS, hai ngôn ngữ lập trình cốt lõi để xây dựng trang web.
                                    </BlockInfoRightCourse>
                                </BlockInfoCourse>
                                <Divider />
                                <BlockInfoCourse>
                                    <BlockInfoLeftCourse> Giảng viên</BlockInfoLeftCourse>
                                    <BlockInfoRightCourse>
                                        <Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Box sx={{ width: '60px', height: '60px', marginRight: theme.spacing(1) }}>
                                                    <AvatarCustom
                                                        src={"https://img-c.udemycdn.com/user/200_H/173508024_80bd_3.jpg"} />
                                                </Box>
                                                <Box>
                                                    <Title1>Thúy Nguyễn</Title1>
                                                    <Content>Programming Academy</Content>
                                                </Box>
                                            </Box>
                                            <Content>
                                                Hello World
                                                Thuy Nguyen IO focuses on training software programming such as Website, Mobile Apps, Games, Blockchain, AI, etc. We offers a wide range of courses from basic languages to cutting-edge technologies. We emphasizes clear, practical learning with dedicated support and a strong community, empowering individuals
                                                Many thanks to all you
                                            </Content>
                                        </Box>
                                    </BlockInfoRightCourse>
                                </BlockInfoCourse>
                                <Divider />
                            </Box>
                        </Box>
                    </Box>
                    {/* Nội dung khóa học */}
                    <Box sx={{ width: '25%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: theme.spacing(2) }}>
                            <Title1>Nội dung khóa học</Title1>
                            <Box>
                                <Tooltip 
                                sx={{
                                    marginRight:theme.spacing(0.5)
                                }}
                                title="Khóa học không đủ tiêu chuẩn để xuất bản">
                                    <Button variant="contained" color="error">
                                        Hủy
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Khóa học xẽ được xuất bản sau khi duyệt">
                                    <Button variant="contained" color="success">
                                        Xét Duyệt
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <UnitList
                            value={{
                                numberUnit: 1,
                                name: 'Học phần HTML'
                            }} />
                        <UnitList
                            value={{
                                numberUnit: 2,
                                name: 'Học phần CSS'
                            }} />
                    </Box>

                </Box>
            </Box>
        </LayoutAdmin>
    )
}