import { Box, Button, Link, Paper, Step, StepLabel, Stepper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import TextFieldCounter from "../../layouts/TextFieldCounter";
import { useNavigate } from "react-router-dom";


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
)


export default function CreateCourse() {
    const [activeStep, setActiveStep] = useState(0);
    const [nameCourse, setNameCourse] = useState("");
    const [categoryCourse, setCategoryCourse] = useState("");
    const [allowNext, setAllowNex] = useState(false);

    const theme = useTheme();

    const navigate = useNavigate();

    const rolesCourseString = ["", "Phát Triên", "Kinh doanh", "Tài chính & Kinh Tế", "CNTT & Phần mềm"];

    const rolesCoursItem = (arrRole) => {
        let item = arrRole.map((value) => {
            return { value: value, key: value };
        })
        return item;
    }
    const totalSteps = () => {
        return steps.length;
    }


    const isLastSteps = () => {
        return activeStep === totalSteps() - 1;
    }

    const handleNext = (e) => {
        
        if(isLastSteps()){
            navigate('/educator/course/edit')
        }else{
            setActiveStep(activeStep+1);
        }
    }

    // kiểm tra nếu giá trị các thành phần trong step hợp lệ hay không
    const isAllowNex = () => {
        if (activeStep == 0 && nameCourse.length > 0) {
            console.log(nameCourse.length>0)
            return true;
        }
        if (activeStep == 1 && categoryCourse.length > 0) {
            console.log(categoryCourse)
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

    const handleSelectCategoryCoure = (value) => {
        setCategoryCourse(value);
    }
    return (
        <Box sx={{ width: '100%' }}>
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
                                    <Step>
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
                    <DropDownMenu ListItem={rolesCoursItem(rolesCourseString)}
                        onChange={handleSelectCategoryCoure}
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
                <Button sx={{
                    margin: theme.spacing(1)
                }}
                    variant="contained"
                    disabled={!isAllowNex()}
                    onClick={handleNext}
                >{!isLastSteps() ? 'Tiếp tục' : 'Hoàn thành'}</Button>
            </Paper>
        </Box>
    )
}