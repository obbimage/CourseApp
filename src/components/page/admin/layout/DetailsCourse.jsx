import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Tooltip, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./LayoutAdmin";
import Video from "../../../video/Video";
import { Children, useEffect, useState } from "react";
import { Block, Height } from "@mui/icons-material";
import AvatarCustom from "../../../layouts/AvatarCustom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { grey } from "@mui/material/colors";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useParams } from "react-router-dom";
import { getCourseById, setConfirmCourse } from "../../../../api/course";
import { handleApiResponse } from "../../../../api/instance";
import convertStringHtml from "../../user/components/convertStringToHtml";
import { getUnitsByCourseId } from "../../../../api/unit";
import { getSectionByUnitId } from "../../../../api/section";


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

const UnitList = ({ value, onChange }) => {
    const [unit, setUnit] = useState(value);
    const [sections, setSections] = useState([]);

    const handleChange = (value) => {
        if (onChange)
            onChange(value);
    }

    useEffect(() => {
        setUnit(value);

        let unitId = value.id
        getSectionByUnitId(unitId)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (sectionResponse) => {
                        setSections(sectionResponse);
                    }
                )
            })
    }, [value])

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
                {/* <Content>Phần {unit?.numberUnit}: {unit?.name}</Content> */}
                <Content>{unit?.title}</Content>
            </AccordionSummary>
            {
                sections.map(section => {
                    return (
                        <SectionList
                            value={{
                                numberSection: section.numberSection,
                                name: section.title,
                                video: section.urlVideo

                            }}
                            onSelect={handleChange}
                        />
                    )
                })
            }
        </Accordion>
    )
};
const SectionList = ({ value, onSelect }) => {
    const theme = useTheme();
    const section = value;

    const handleSelect = () => {
        if (onSelect)
            onSelect(value);
    }
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
                    onClick={handleSelect}
                    startIcon={<PlayCircleOutlineIcon />}>
                    <Content>{section.numberSection}. {section.name}</Content>
                </Button>
            </AccordionDetails>
        </>
    )
}
export default function DetailsCourse() {
    const theme = useTheme();
    const pargram = useParams();
    const [course, setCourse] = useState({});

    const [units, setUnits] = useState([]);
    const [section, setSection] = useState({});

    const [openAlert, setOpenAlert] = useState(false);
    const [alert,setAlert] = useState("");
    const [severity,setSeverity] = useState("success");

    useEffect(() => {
        let courseId = pargram.courseId;
        if (courseId) {
            getCourseById(courseId)
                .then(response => {
                    handleApiResponse(response,
                        // success
                        (courseResponse) => {
                            setCourse(courseResponse);
                        }
                    )
                })

            // get units
            getUnitsByCourseId(courseId)
                .then(response => {
                    handleApiResponse(response,
                        //sucess
                        (unitsResponse) => {
                            console.log(unitsResponse)
                            setUnits(unitsResponse);
                            // set alert
                            setAlert("Xuyết duyệt thành công");
                            setSeverity("success");
                        },
                        // failed
                        (err)=>{
                            setAlert("Xét duyệt thất bại");
                            setSeverity("error");
                        }
                    )
                    setOpenAlert(true);
                });
        }
    }, []);

    const handleChangeSection = (value) => {
        setSection(value);
    }

    // xét duyệt khóa học
    const handleConfirm = () => {
        setConfirmCourse(course.id,true)
        .then(response=>{
            handleApiResponse(response,
                // success
                (courseResponse)=>{
                    setCourse(courseResponse);
                }
            )
        })
    }

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
                                source={section.video} />
                        </Box>
                        <Box>
                            <Box>
                                <Title>{course?.name}</Title>
                                <Content>{course?.summary}</Content>
                            </Box>
                            <Divider />
                            <Box>
                                <BlockInfoCourse>
                                    <BlockInfoLeftCourse>Mô tả</BlockInfoLeftCourse>
                                    <BlockInfoRightCourse>
                                        {convertStringHtml(course?.description || "")}
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
                                                    <Title1>{`${course?.user?.lastName} ${course?.user?.firstName}`}</Title1>
                                                    <Content>{course?.user?.educator?.biography}</Content>
                                                </Box>
                                            </Box>
                                            <Content>{course?.user?.educator?.description}</Content>
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
                                        marginRight: theme.spacing(0.5)
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
                        {units.map(unit => {
                            return (
                                <UnitList
                                    value={unit}
                                    onChange={handleChangeSection} />
                            );
                        })}
                    </Box>

                </Box>
            </Box>
        </LayoutAdmin>
    )
}