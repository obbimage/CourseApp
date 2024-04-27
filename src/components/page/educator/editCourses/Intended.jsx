import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../../../provider/CourseProvider";
import TextFieldCounter from "../../../layouts/TextFieldCounter";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse } from "./LayoutEditCourse";

import { getCourseById } from '../../../../api/course';
import { deleteStudyWillLearnById, getStudyWillLearnByCourseId, insertStudyWillLearn } from "../../../../api/studyWillLearn";
import { getStorageCourseId } from '../../../../util/localStorage';

import ClearIcon from '@mui/icons-material/Clear';
import { deleteLevelRequirementById, getLevelRequireByCourseId, insertLevelRequirements } from '../../../../api/levelRequire';
import { deleteWhoCourseById, getWhoCourseByCourseId, insertWhoCourses } from '../../../../api/whoCourse';
import { SsidChartSharp } from '@mui/icons-material';

// trang mục tiêu khóa học
export default function Intended() {
    const theme = useTheme();
    const placeholderWillLearn = [
        "Ví dụ: Xác định vai trò và trách nhiệm của người quản lý",
        "Ví dụ: Ước tính tiến độ và ngân sách dự kiến",
        "Ví dụ: Xác định và quản lý dự án",
        "Ví dụ: Hoàn thành nghiên cứu điển hình để quản lý dự án từ khâu ý tưởng đến khi hoàn thành",
    ];
    const placeholderRequirement = ['Ví dụ: Không cần khinh nghiệm lập trình. Học mọi thứ mà bạn cần biết'];
    const placeholderWhoCourse = ['Ví dụ: Các nhà phát triển Python trình độ sơ cấp muốn tìm hiểu về khoa học dữ liệu'];

    // lưu origin để so sánh thay đổi với data gốc
    let [willStudyLearnOrigin, setWillStudyLearnOrigin] = useState([]);
    const [willStudyLearns, setWillStudyLearn] = useState([]);
    const lengthMinInputWillStudyLearn = 4;
    const [inputWillStudyLearn, setInputWillStudyLearn] = useState(placeholderWillLearn);
    const [deleteWillStudyLearnList, setDeleteWillLearnList] = useState([]); // chua danh sach data can xoa

    const [inputRequirements, setInputRequirements] = useState(placeholderRequirement);
    const [requirements, setRequirement] = useState([]);
    const lengthMinInputRequirement = 1;
    const [deleteRequirementList, setDeleteRequirementList] = useState([]);
    const [requirementsOrigin, setRequirementOrigin] = useState([]);

    const [inputWhoCourse, setInputWhoCourse] = useState(placeholderWhoCourse);
    const [whoCourse, setWhoCourse] = useState([]);
    const [whoCourseOrigin, setWhoCourseOrigin] = useState([]);
    const lengthMinInputWhoCourse = 1;
    const [deleteWhoCourseList, setDeleteWhoCourse] = useState([]);

    const [isShowAlert, setIsShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [alert, setAlert] = useState("");

    // context
    const { courseProvider, setCourseProvider } = useContext(CourseContext);
    //const{currentUser,setCurrentUser} = useContext(CurrentUserContext);

    useEffect(() => {
        // lay course tu id da duoc luu
        const idCourse = getStorageCourseId();
        if (idCourse !== null) {
            getCourseById(idCourse)
                .then(response => {
                    const course = response.data.data
                    setCourseProvider(course);
                    return course;
                })
                // sau lay get course
                // tien hanh set cac gia tri mat dinh
                .then(course => {
                    getStudyWillLearnByCourseId(course.id)
                        .then(response => {
                            if (response?.status === 200) {
                                const studyWillLearns = response.data.data;
                                setWillStudyLearn(studyWillLearns);
                                // lưu lại để so sánh sự thay đổi
                                setWillStudyLearnOrigin(studyWillLearns);
                            }
                        })
                });

            getLevelRequireByCourseId(idCourse, requirements)
                .then(response => {
                    if (response && response.status === 200) {
                        const data = response.data.data;
                        setRequirement(data);
                        setRequirementOrigin(data);
                    }
                })

            getWhoCourseByCourseId(idCourse)
                .then(response => {
                    if (response && response.status === 200) {
                        const data = response.data.data;
                        setWhoCourse(data);
                        setWhoCourseOrigin(data);
                    }
                })
        }
    }, []);

    useEffect(() => {
        // them o input will learn neu dai hơn mặc định
        if (inputWillStudyLearn.length < willStudyLearns.length) {
            let newInput = [];
            for (let i = lengthMinInputWillStudyLearn + 1; i <= willStudyLearns.length; i++) {
                newInput = [...newInput, placeholderWillLearn[i % placeholderWillLearn.length]]
                // setInputWillStudyLearn([...inputWillStudyLearn, placeholderWillLearn[i % placeholderWillLearn.length]]);
            }
            setInputWillStudyLearn([...inputWillStudyLearn, ...newInput]);
        }
    }, [willStudyLearns])

    useEffect(() => {
        // them o input requirement neu data nap vao dai hon mac dinh
        if (inputRequirements.length < requirements.length) {
            let newValue = []
            for (let i = lengthMinInputRequirement + 1; i <= requirements.length; i++) {
                newValue = [...newValue, placeholderRequirement[i % placeholderRequirement.length]];
            }
            setInputRequirements([...inputRequirements, ...newValue]);
        }
    }, [requirements]);

    useEffect(() => {
        if (inputWhoCourse.length < whoCourse.length) {
            let newValue = [];
            for (let i = lengthMinInputWhoCourse + 1; i <= whoCourse.length; i++) {
                newValue = [...newValue, placeholderWhoCourse[i % placeholderWhoCourse.length]];
            };
            setInputWhoCourse([...inputWhoCourse, ...newValue]);
        }
    }, [whoCourse]);

    //============= thêm input khi nhân vào button add================
    const handleAddInputWillStudyLearn = (e) => {
        setInputWillStudyLearn([...inputWillStudyLearn, placeholderWillLearn[inputWillStudyLearn.length % placeholderWillLearn.length]]);
    }
    const handleAddInputRequirement = () => {
        setInputRequirements([...inputRequirements, placeholderRequirement[inputRequirements.length % placeholderRequirement.length]]);
    }
    const handleAddInputWhoCourse = () => {
        setInputWhoCourse([...inputWhoCourse, placeholderWhoCourse[inputWhoCourse.length % placeholderWhoCourse.length]]);
    }

    // ================= onchange event ======================
    const handleOnChangeWillStudyLearn = (event, index) => {
        let newValue = willStudyLearns;
        newValue[index] = {
            content: event.target.value
        };
        setWillStudyLearn([...newValue]);
    }

    const handleOnChangeRequirement = (event, index) => {
        let newValue = requirements;
        newValue[index] = {
            level: event.target.value
        }
        setRequirement([...newValue]);
    }

    const handleWhoCourse = (e, index) => {
        let newValue = whoCourse;
        newValue[index] = {
            whoCourse: e.target.value
        }
        setWhoCourse([...newValue]);
    }
    //=============== xử lý khi  click vào button clear
    const handleClearWillStudyLearn = (e, index) => {
        // xoa data co vi tri tai index
        const fillData = willStudyLearns.filter((value, indexValue) => value !== willStudyLearns[index]);
        setWillStudyLearn(fillData);

        // xoa 1 o input nếu lớn hơn độ dài tối thiểu thì xóa đi một o
        if (willStudyLearns.length > lengthMinInputWillStudyLearn) {
            inputWillStudyLearn.pop();
            setInputWillStudyLearn(inputWillStudyLearn);
        }
        // nhung data id tuc la co trong csdl
        // chua nhung phan bi xoa
        // xoa sau khi xac nhan gui du lieu
        const deleteList = willStudyLearnOrigin.filter((value) => {
            return !fillData.includes(value) && value.id;

        });
        setDeleteWillLearnList(deleteList);
    }

    const handleClearRequirement = (e, index) => {
        const fillData = requirements.filter((value) => value !== requirements[index])
        setRequirement(fillData);

        // xoa 1 o input neu lon hon do dai toi thieu
        if (requirements.length > lengthMinInputRequirement) {
            inputRequirements.pop();
            setInputRequirements(inputRequirements);
        }
        // những data có id tức là đã có trong csdl
        // chua nhung phan bi xoa
        // xoa sau khi xac nhan gui du lieu
        const deleteList = requirementsOrigin.filter((value) => {
            return !fillData.includes(value) && value.id;
        });
        setDeleteRequirementList(deleteList);
    }

    const handleClearWhoCourse = (e, index) => {
        const fillData = whoCourse.filter((value) => {
            return value !== whoCourse[index];
        });
        setWhoCourse(fillData);

        const deleteList = whoCourse.filter((value) => {
            return !fillData.includes(value) && value.id;
        });
        setDeleteWhoCourse(deleteList);
    }
    // ================================================//

    // sửu lý button gửi dữ liệu
    const handleSentData = async () => {
        let isSendDataSuccess = false;
        //==========xử lý data will learn===================//
        await insertStudyWillLearn(courseProvider.id, willStudyLearns)
            .then(response => {
                if (response && response.status === 200) {
                    isSendDataSuccess = true;
                } else {
                    isSendDataSuccess = false;
                }
            });

        for (const willStudyLearn of deleteWillStudyLearnList) {
            const id = willStudyLearn.id
            if (id) {
                await deleteStudyWillLearnById(id)
                    .then(response => {
                        if (response && response.status === 200) {
                            // isSendDataSuccess = true;
                        }
                    });
            }

        }
        //============ require =============//
        await insertLevelRequirements(courseProvider.id, requirements)
            .then(response => {
                if (response && response.status === 200) {
                    isSendDataSuccess = true;
                } else {
                    isSendDataSuccess = false;
                }
            })
        for (const requirement of deleteRequirementList) {
            const id = requirement.id;
            if (id) {
                await deleteLevelRequirementById(id)
                    .then(response => {
                        console.log(response);
                    })
            }
        }
        //============ require =============//
        await insertWhoCourses(courseProvider.id, whoCourse)
            .then(response => {
                console.log('response insert who course: ', response);
                if (response && response.status === 200) {
                    isSendDataSuccess = true;
                } else {

                    isSendDataSuccess = false;
                }
            });

        for (const whoCourseItem of deleteWhoCourseList) {
            const whoCourseId = whoCourseItem.id;
            if (whoCourseId) {
                await deleteWhoCourseById(whoCourseId)
                    .then(response => {
                        console.log(response);
                    });
            }
        }
        if (isSendDataSuccess) {
            setAlert("Lưu thành công");
            setIsSuccess(true);
        } else {
            setAlert("Lưu thất bại");
            setIsSuccess(false);
        }

        setIsShowAlert(true);

    }

    const handleOnCloseAlert = () => {
        setIsShowAlert(false);
    }

    return (
        <LayoutEditCourse>
            <Box display={isShowAlert ? 'block' : 'none'}>
                <Alert
                    severity={isSuccess ? 'success' : 'error'}
                    sx={{
                        position: 'fixed',
                    }}
                    onClose={handleOnCloseAlert}>
                    {
                        alert
                    }
                </Alert>

            </Box>
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>
                    Học viên Mục tiêu
                </TitleHeaderEditCourse>
            </HeaderEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Typography sx={{ margin: theme.spacing(4, 0, 4, 0) }}   >
                    Các mô tả sau sẽ hiển thị công khai trên Trang tổng quan khóa học của bạn và sẽ tác động trực tiếp đến thành tích khóa học,
                    đồng thời giúp học viên quyết định xem khóa học đó có phù hợp với họ hay không.
                </Typography>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ marginBottom: theme.spacing(2) }}>
                <Typography variant="h6">Học viên sẽ học được gì trong khóa học của bạn?</Typography>
                <Typography>Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà học viên có thể mong đợi đạt được sau khi hoàn thành khóa học</Typography>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ width: '700px' }}>
                {
                    inputWillStudyLearn.map((placeHolder, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', height: '50px', marginBottom: theme.spacing(2) }}>
                                <TextFieldCounter key={index} sx={{ width: '100%', height: '100%', }} max={160}
                                    onChange={(e) => handleOnChangeWillStudyLearn(e, index)}
                                    value={willStudyLearns[index]?.content}
                                    placeHolder={placeHolder} />
                                <Button startIcon={
                                    <ClearIcon />
                                }
                                    disabled={!willStudyLearns[index]}
                                    onClick={(e) => handleClearWillStudyLearn(e, index)}
                                >
                                </Button>
                            </Box>
                        );
                    })
                }
                <Button onClick={handleAddInputWillStudyLearn} startIcon={<AddIcon />}>Thêm nội dung quản lý dự án</Button>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ marginBottom: theme.spacing(2) }}>
                <Typography variant="h6">Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn là gì?</Typography>
                <Typography>Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên bắt buộc phải có trước khi tham gia khóa học.</Typography>
                <Typography>Nếu bạn không có yêu cầu nào, hãy tận dụng phần này và coi đây là cơ hội để bạn hạ thấp tiêu chuẩn cho người mới bắt đầu.</Typography>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ width: '700px' }}>
                {
                    inputRequirements.map((placeHolder, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', height: '50px', marginBottom: theme.spacing(2) }}>
                                <TextFieldCounter key={index} sx={{ width: '100%', height: '50px', marginBottom: theme.spacing(2) }} max={160}
                                    onChange={(e) => handleOnChangeRequirement(e, index)}
                                    value={requirements[index]?.level}
                                    placeHolder={placeHolder} />
                                <Button startIcon={
                                    <ClearIcon />
                                }
                                    disabled={!requirements[index]}
                                    onClick={(e) => handleClearRequirement(e, index)}
                                >
                                </Button>
                            </Box>
                        );
                    })
                }
                <Button onClick={handleAddInputRequirement} startIcon={<AddIcon />}>Thêm nội dung quản lý dự án</Button>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ marginBottom: theme.spacing(2) }}>
                <Typography variant="h6">Khóa học này dành cho đối tượng nào?</Typography>
                <Typography>Viết mô tả rõ ràng về học viên mục tiêu cho khóa học, tức là những người sẽ thấy nội dung khóa học có giá trị.
                    Điều này sẽ giúp bạn thu hút học viên phù hợp tham gia khóa học.</Typography>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{ width: '700px' }}>
                {
                    inputWhoCourse.map((placeHolder, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', height: '50px', marginBottom: theme.spacing(2) }}>
                                <TextFieldCounter key={index} sx={{ width: '100%', height: '50px', marginBottom: theme.spacing(2) }} max={160}
                                    onChange={(e) => handleWhoCourse(e, index)}
                                    value={whoCourse[index]?.whoCourse}
                                    placeHolder={placeHolder} />
                                <Button startIcon={
                                    <ClearIcon />
                                }
                                    disabled={!requirements[index]}
                                    onClick={(e) => handleClearWhoCourse(e, index)}
                                >
                                </Button>
                            </Box>
                        );
                    })
                }
                <Button onClick={handleAddInputWhoCourse} startIcon={<AddIcon />}>Thêm nội dung quản lý dự án</Button>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Button onClick={handleSentData} variant="contained">Lưu</Button>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse >

    )
}