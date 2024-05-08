// Trang tổng quan khóa học

import { Alert, Box, Button, Input, OutlinedInput, Tooltip, Typography, styled, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse, WrapContentLayoutEditCourse } from "./LayoutEditCourse";
import InputCounter from "../../../layouts/InputCounter";
import TextEditor from "../../../layouts/Editor";
import { DropDownMenu, dropDownItem } from "../../../layouts/DropDownMenu";
import { useContext, useEffect, useState } from "react";
import InputFileUpload, { InputFileImgUpload, InputFileVideoUpload } from "../../../layouts/InputFileUpload";
import { CourseContext } from "../../../../provider/CourseProvider";
import { getStorageCourseId } from "../../../../util/localStorage";
import { getCourseById, insertClipDemoCourse, insertCourse, insertImgCourse } from "../../../../api/course";
import { handleApiResponse } from "../../../../api/instance";
import HelpIcon from '@mui/icons-material/Help';
import { CurrentUserContext } from "../../../../App";
import Video from "../../../video/Video";
import DialogProgress from "../../../feedback/DialogProgress";
import AlertList, { AlertItem, alertsItem } from "../../../feedback/AlertList";
import { stringAlert } from "../../../../static/stringAlert";
import { getAllCourseRole, getRoleCourseByCourseId } from "../../../../api/roleCourse";
import { getSubRoleCourseByCourseId } from "../../../../api/subRole";
import { v4 as uuidv4 } from 'uuid';
import { getAllLanguage } from "../../../../api/language";


const heightInput = '48px';

const Img = styled('img')
    (({ theme }) => ({
        // width:'100%'
        height: '100%'
    }));

const Title = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography sx={{
            fontWeight: '600',
            marginBottom: theme.spacing(1)
        }}>
            {children}
        </Typography>
    )
}

export default function LadingPage() {
    // const {courseProvide,setCourseProvider} = useContext(CourseContext);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [course, setCourse] = useState({});
    const [descriptionCourse, setDescriptionCourse] = useState('');
    const [imgFiles, setImgFiles] = useState(null);
    const [clipDemoFiles, setClipDemoFiles] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const [clipDemoSrc, setClipDemoSrc] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    const [alerts, setAlerts] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    const [roles, setRoles] = useState([]);
    const [roleIdCourse, setRoleIdCourse] = useState(null);

    const [subRoles, setSubRoles] = useState([]);
    const [subRolesId, setSubRolesId] = useState(null);

    const [languages, setLanguages] = useState([]);
    const [languageCourseId, setLanguageCourseId] = useState(null);

    useEffect(() => {
        const courseId = getStorageCourseId();
        if (courseId !== null) {
            // lay khoa hoc
            getCourseById(courseId)
                .then(response => {
                    handleApiResponse(response,
                        (courseResponse) => {
                            console.log(courseResponse)
                            setCourse(courseResponse);

                            // setDescriptionCourse(courseResponse.description);
                            // setImgSrc(courseResponse.img);
                            // setRoleIdCourse(courseResponse.role?.id);
                            // setSubRolesId(courseResponse.subRole?.id);
                            // setLanguageCourseId(courseResponse.language?.id);
                            // setClipDemoSrc(courseResponse.clipDemo);
                        });
                },
                    () => {

                    });
            // lay toan bo the loai khoa hoc
            getAllCourseRole()
                .then(response => {
                    handleApiResponse(response,
                        (roleResponse) => {
                            // console.log(roleResponse)
                            setRoles(roleResponse);
                        }
                    )
                });
            // lay toan bo language
            getAllLanguage()
                .then(response => {
                    console.log('response', response)
                    handleApiResponse(response,
                        (languagesResponse) => {
                            console.log(languagesResponse)
                            setLanguages(languagesResponse);
                        }
                    )
                });

        } else {
            console.error("courseId in Storage is empty");
        }

    }, []);

    useEffect(() => {
        
        setDescriptionCourse(course.description);
        setImgSrc(course.img);
        setRoleIdCourse(course.role?.id);
        setSubRolesId(course.subRole?.id);
        setLanguageCourseId(course.language?.id);
        setClipDemoSrc(course.clipDemo);
    }, [course]);

    useEffect(() => {
        if (roleIdCourse) {
            getSubRoleCourseByCourseId(roleIdCourse)
                .then(response =>
                    handleApiResponse(response,
                        (subRolesResponse) => {
                            setSubRoles(subRolesResponse);
                        }
                    )
                )
        }
    }, [roleIdCourse]);

    const theme = useTheme();

    const handleOnChangeRole = (roleId) => {
        setRoleIdCourse(roleId);
        // neu co chon thi set gia tri moi cho course
        if (roleId) {
            let newCourse = {
                ...course,
                role: {
                    id: roleId
                }
            }
            setCourse(() => newCourse);
        };
    }

    const handleOnChangeLanguage = (languageId) => {
        setLanguageCourseId(languageId);

        if (languageId) {
            let newCourse = {
                ...course,
                language: {
                    id: languageId
                }
            }
            setCourse(newCourse);
        }
    }

    const handleOnChangeSubRole = (subRoleId) => {
        setSubRolesId(subRoleId);
        // neu co chon thi set gia tri moi cho course
        if (subRoleId) {
            let newCourse = {
                ...course,
                subRole: {
                    id: subRoleId
                }
            }
            setCourse(() => newCourse);
        };
    }

    const handleChangeDescriptionCourse = (value) => {
        let newCourse = {
            description: value
        };
        setCourse({
            ...course,
            ...newCourse
        });
    }

    const handleImgFiles = (files) => {
        console.log(files)
        setImgFiles(files);
        // Sử dụng FileReader để đọc dữ liệu từ tệp đầu tiên
        const reader = new FileReader();
        reader.onload = () => {
            // Thiết lập ImgSrc thành URL dữ liệu của hình ảnh
            setImgSrc(reader.result);
        };

        // Đọc tệp hình ảnh đầu tiên
        if (files.length > 0) {
            reader.readAsDataURL(files[0]);
        }
    }

    const handleCipDemoFiles = (files) => {
        setClipDemoFiles(files);

        const reader = new FileReader();
        reader.onload = () => {
            setClipDemoSrc(reader.result);
        }
        if (files.length > 0) {
            reader.readAsDataURL(files[0]);
        }
    }

    const handleChangeSummaryCourse = (e) => {
        let summary = e.target.value;
        let newCourse = {
            ...course,
            summary: summary // tóm tắt khóa học
        }
        setCourse(newCourse);
    }

    // gửi data lên sever
    const handleSave = async () => {
        setOpenDialog(true);
        const userId = currentUser.id;



        console.log(course)
        await insertCourse(userId, course)
            .then(response => {
                handleApiResponse(response,
                    (courseData) => {
                        console.log('insert course:', courseData);
                        setCourse(courseData);
                        let itemAlert = alertsItem(stringAlert.updateSuccess);
                        alerts.push(itemAlert);
                        setAlerts(alerts);
                    }
                    , (err) => {
                        console.log(err);
                        let itemAlert = alertsItem(stringAlert.updateFailed, 'error');
                        alerts.push(itemAlert);
                        setAlerts(alerts);
                    });
            });

        if (imgFiles) {
            const courseId = course.id;
            await insertImgCourse(courseId, imgFiles[0])
                .then(response => {
                    handleApiResponse(response,
                        (courseData) => {
                            console.log('insert img course:', courseData);
                            setCourse(courseData);
                            let itemAlert = alertsItem(stringAlert.updateImgSuccess);
                            alerts.push(itemAlert);
                            setAlerts(alerts);
                            setImgFiles(null);
                        },
                        () => {
                            let itemAlert = alertsItem(stringAlert.updateImgFailed, 'error');
                            alerts.push(itemAlert);
                            setAlerts(alerts);
                        }
                    )
                })
        };
        if (clipDemoFiles) {
            const courseId = course.id;
            console.log('clip demo', clipDemoFiles)
            await insertClipDemoCourse(courseId, clipDemoFiles[0])
                .then(response => {
                    handleApiResponse(response,
                        (courseData) => {
                            console.log('insert clip demo: ', courseData)
                            setCourse(courseData);
                            let itemAlert = alertsItem(stringAlert.updateVideoSuccess);
                            let newAlerts = [...alerts, itemAlert];
                            alerts.push(itemAlert);
                            setAlerts(alerts);
                        },
                        (err) => {
                            console.error(err)
                            let itemAlert = alertsItem(stringAlert.updateVideoFailed, 'error');
                            alerts.push(itemAlert);
                            setAlerts(alerts);
                        }
                    )
                })
        }
        setOpenDialog(false);
        setOpenAlert(true);
    }
    return (
        <>
            <AlertList open={openAlert}>
                {
                    alerts.map((item) => {
                        return (
                            <AlertItem key={uuidv4()} severity={item.severity}>{item.content}</AlertItem>
                        )
                    })
                }
            </AlertList>
            <DialogProgress
                open={openDialog} />
            <LayoutEditCourse>
                <HeaderEditLayoutCourse>
                    <TitleHeaderEditCourse>
                        Trang tổng quan khóa học
                    </TitleHeaderEditCourse>
                </HeaderEditLayoutCourse>
                <WrapBoxEditLayoutCourse>
                    <WrapContentLayoutEditCourse>
                        <Typography>
                            Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn.
                            Khi bạn hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý do ai đó muốn ghi danh khóa học của bạn.
                        </Typography>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>
                            Tên khóa học
                        </Title>
                        <Box height={heightInput}>
                            <InputCounter
                                placeholder="Chọn tiêu đề khóa học"
                                defaultValue={course.name}
                            />
                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>
                            Mô tả khóa học
                        </Title>
                        <Box>
                            <TextEditor
                                initialValue={descriptionCourse}
                                onChange={handleChangeDescriptionCourse}
                            />
                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>
                            Thông tin cơ bản
                        </Title>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '290px' }}>
                                <DropDownMenu
                                    labelOption={"-----Ngôn ngữ-----"}
                                    value={languages}
                                    defaultValue={languageCourseId}
                                    onChange={handleOnChangeLanguage}
                                />
                            </Box>
                            <Box sx={{ width: '290px' }}>
                                <DropDownMenu
                                    labelOption={"-----Thể loại-----"}
                                    value={roles}
                                    defaultValue={roleIdCourse}
                                    onChange={handleOnChangeRole} />
                            </Box>
                            <Box sx={{ width: '290px' }}>
                                <DropDownMenu
                                    labelOption={"-----Thể loại con-----"}
                                    value={subRoles}
                                    defaultValue={subRolesId}
                                    onChange={handleOnChangeSubRole}
                                />
                            </Box>

                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>
                            Khóa học của bạn chủ yếu giảng dạy nội dung nào?
                        </Title>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '450px', height: heightInput }}>
                                <OutlinedInput fullWidth sx={{
                                    height: '100%'
                                }}
                                    placeholder="Ví dụ nghệ thuật phong cảnh"
                                    value={course?.summary ? course.summary : ""}
                                    onChange={handleChangeSummaryCourse}
                                />
                            </Box>
                            <Tooltip title="Tóm tắt nội dung khóa học của bạn" placement="right" arrow>
                                <Button sx={{
                                    color: 'inherit',
                                    ':hover': {
                                        backgroundColor: theme.palette.background.default
                                    }
                                }}>
                                    <HelpIcon />
                                </Button>
                            </Tooltip>
                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>Hình ảnh khóa học</Title>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Box sx={{ width: '450px', height: '250px', marginRight: theme.spacing(3) }}>
                                <Img src={imgSrc ? imgSrc : `${process.env.PUBLIC_URL}/imgs/4.png`} />
                            </Box>
                            <Box>
                                <Typography marginBottom={theme.spacing(3)}>
                                    Tải hình ảnh khóa học lên tại đây. Để được chấp nhận,
                                    hình ảnh phải đáp ứng tiêu chuẩn chất lượng hình ảnh khóa học. Hướng dẫn quan trọng:
                                    750x422 pixel; .jpg, .jpeg,. gif, hoặc .png. và không có chữ trên hình ảnh.
                                </Typography>
                                <InputFileImgUpload
                                    fileNameDefault={course.img}
                                    label="Upload a Image"
                                    handleFiles={handleImgFiles}
                                />
                            </Box>
                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Title>Video quảng cáo</Title>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Box sx={{ minWidth: '450px', minHeight: '250px', marginRight: theme.spacing(3) }}>
                                {/* <Img src={imgSrc ? imgSrc : `${process.env.PUBLIC_URL}/imgs/4.png`} /> */}
                                <Video source={clipDemoSrc} />
                            </Box>
                            <Box>
                                <Typography marginBottom={theme.spacing(3)}>
                                    Video quảng cáo của bạn là một cách nhanh chóng và hấp dẫn để học viên xem trước
                                    những gì họ sẽ học trong khóa học của bạn. Học viên quan tâm đến khóa học của bạn
                                    có nhiều khả năng ghi danh hơn nếu video quảng cáo của bạn được thực hiện tốt
                                </Typography>
                                <InputFileVideoUpload
                                    fileNameDefault={course.img}
                                    label="Upload a Video"
                                    handleFiles={handleCipDemoFiles}
                                />
                            </Box>
                        </Box>
                    </WrapContentLayoutEditCourse>
                    <WrapContentLayoutEditCourse>
                        <Button variant="contained"
                            onClick={handleSave}>
                            Lưu
                        </Button>
                    </WrapContentLayoutEditCourse>
                </WrapBoxEditLayoutCourse>
            </LayoutEditCourse>
        </>
    )
}