import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Paper, Slide, Step, StepLabel, Stepper, Typography, useTheme } from "@mui/material";
import { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TextFieldCounter from "../../layouts/TextFieldCounter";
import { useNavigate } from "react-router-dom";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import CourseProvider, { CourseContext } from "../../../provider/CourseProvider";
import { CurrentUserContext } from "../../../App";
import { getAllCourseRole } from "../../../api/roleCourse";
import { insertCourse } from "../../../api/course";
import { setStorageCourseId } from "../../../util/localStorage";


const steps = ['Tạo tiêu đề', 'Chọn Lĩnh vực'];

// const Tab = ({ sx, children, index, active }) => {

//     const isActive = () => {
//         return index == active;
//     }
//     return (
//         <Box sx={sx} display={isActive() ? 'flex' : 'none'}>
//             {children}
//         </Box>
//     )
// }

const Tab = styled(Box, { shouldForwarProp: (prop) => prop !== 'index' && prop !== 'active' })(
    ({ theme, index, active }) => ({
        display: index == active ? 'flex' : 'none'
    })
);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CreateCourse() {
    const [activeStep, setActiveStep] = useState(0);
    // course state
    // dung de tao khoa hoc
    const [nameCourse, setNameCourse] = useState("");
    const [categoryCourse, setCategoryCourse] = useState("");
    // dialog
    const [openDialog,setOpenDialog] = useState(false);
    // roles state
    // danh sach role hien cos
    const [roleCourse, setRoleCourse] = useState([]);
    const [allowNext, setAllowNex] = useState(false);

    const theme = useTheme();
    // chuyển hướng trang
    const navigate = useNavigate();
    //  context
    const { courseProvider, setCourseProvider } = useContext(CourseContext);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);


    useEffect(() => {
        getAllCourseRole()
            .then(response => {
                if (response.status === 200) {
                    const data = response.data.data;
                    const courseItem = data.map((role) => {
                        return { value: role.id, key: role.name }
                    });
                    setRoleCourse(courseItem);
                }
            })
    }, []);
    // tra ve số tab hiện có
    const totalSteps = () => {
        return steps.length;
    }

    // kiểm tra hiện tại có đang ở tab cuối cùng hay không
    const isLastSteps = () => {
        return activeStep === totalSteps() - 1;
    }

    const handleNext = (e) => {

        // if (isLastSteps()) {
        //     navigate('/educator/course/edit')
        // } else {
        setActiveStep(activeStep + 1);
        // }

    }

    const handleConfirm = (e) => {
        let course = {
            name: nameCourse,
            roleId: categoryCourse
        };
        // console.log(course);
        setCourseProvider(course);
        insertCourse(currentUser.id, course)
            .then(response => {
                // neu thanh cong thi luu data vao context va chuyen sang trang moi
                if (response.status === 200) {
                    setCourseProvider(response.data.data);
                    // lưu vào store để sử dụng cho trang sau
                    setStorageCourseId(response.data.data.id);
                    navigate('/educator/course/edit');
                } else {
                    // neu that bại thì bật dialog lên để thông báo
                    setOpenDialog(true);
                }
            })
    }

    // kiểm tra nếu giá trị các thành phần trong step hợp lệ hay không
    const isAllowNex = () => {
        if (activeStep == 0 && nameCourse.length > 0) {
            return true;
        }
        return false;
    }

    const isAllowConfirm = () => {
        if (isLastSteps && categoryCourse !== "") {
            return true;
        }
        return false;
    }


    const handleBack = () => {
        setActiveStep((preActive) => preActive - 1);
    }

    const handleInputNameCourse = (e) => {
        setNameCourse(e.target.value);
    }

    const handleSelectCategoryCourse = (value) => {
        setCategoryCourse(value);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Thông báo"}</DialogTitle>
                <DialogContent>
                <Alert severity="error">Tạo khóa học thất bại</Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 20px'
            }}>
                <Box sx={{ padding: '0px 10px', boxShadow: 'rgb(0,0,0,0.15) 1.95px 2.6px' }}>
                    <Typography variant="h4">Course</Typography>
                </Box>
                <Box sx={{ minWidth: '850px' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {
                            steps.map((lable, index) => {
                                return (
                                    <Step key={lable}>
                                        <StepLabel>
                                            {lable}
                                        </StepLabel>
                                    </Step>
                                );
                            })
                        }
                    </Stepper>

                </Box>
                <Link href='/educator/course' sx={{ display: 'flex' }} underline="none">
                    <Button>Thoát</Button>
                </Link>
            </Paper>
            <Tab sx={{
                marginTop: theme.spacing(10),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
                active={activeStep}
                index={0}>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: '500'
                }}>
                    Đặt tên cho khóa Học</Typography>
                <Typography sx={{
                    marginTop: theme.spacing(1),
                    textAlign: 'center'
                }}>
                    Đừng lo nếu bạn không nghĩ ra được một tiêu đề hay ngay bây giờ. Bạn có thể thay đổi sau.</Typography>
                <TextFieldCounter sx={{
                    marginTop: theme.spacing(5),
                    minWidth: '600px'
                }}
                    placeHolder="Ví dụ: Học photoshop từ căn bản"
                    onChange={handleInputNameCourse}
                    value={nameCourse}
                />
            </Tab>
            <Tab sx={{
                marginTop: theme.spacing(10),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
                active={activeStep}
                index={1}>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: '500'
                }}>
                    Thể loại nào phù hợp nhất với kiến thức mà bạn chia sẻ</Typography>
                <Typography sx={{
                    marginTop: theme.spacing(1),
                    textAlign: 'center'
                }}>
                    Nếu không chắc chắn về thể loại phù hợp, bạn có thể thay đổi sau.</Typography>
                <Box sx={{
                    marginTop: theme.spacing(5),
                    minWidth: '600px'
                }}>
                    {/* <DropDownMenu ListItem={rolesCoursItem(rolesCourseString)}
                        onChange={handleSelectCategoryCourse}
                    /> */}
                    <DropDownMenu ListItem={roleCourse}
                        defaultValue={"Chọn thể loại"}
                        onChange={handleSelectCategoryCourse}
                    />
                </Box>
            </Tab>
            <Paper elevation={3} sx={{
                position: 'fixed',
                height: theme.spacing(9),
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                bottom: '0',
                right: '0',
                left: '0'
            }}>
                <Button
                    sx={{
                        margin: theme.spacing(1)
                    }}
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}>
                    Trước
                </Button>
                {
                    !isLastSteps() ?
                        <Button sx={{
                            margin: theme.spacing(1)
                        }}
                            variant="contained"
                            disabled={!isAllowNex()}
                            onClick={handleNext}
                        >{'Tiếp tục'}</Button>
                        :
                        <Button sx={{
                            margin: theme.spacing(1)
                        }}
                            variant="contained"
                            disabled={!isAllowConfirm()}
                            onClick={handleConfirm}
                        >{'Hoàn thành'}</Button>
                }
            </Paper>
        </Box>
    )
}