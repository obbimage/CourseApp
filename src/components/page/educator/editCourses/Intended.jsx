import { Box, Button, Divider, Paper, Typography, useTheme } from "@mui/material";
import TextFieldCounter from "../../../layouts/TextFieldCounter";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse } from "./LayoutEditCourse";

// tragn mục tiêu khóa học
export default function Intended() {
    const theme = useTheme();
    const listWillLearn = [
        "Ví dụ: Xác định vai trò và trách nhiệm của người quản lý",
        "Ví dụ: Ước tính tiến độ và ngân sách dự kiến",
        "Ví dụ: Xác định và quản lý dự án",
        "Ví dụ: Hoàn thành nghiên cứu điển hình để quản lý dự án từ khâu ý tưởng đến khi hoàn thành",
    ];
    const listRequirement = ['Ví dụ: Không cần khinh nghiệm lập trình. Học mọi thứ mà bạn cần biết'];
    const listWhoCourse = ['Ví dụ: Các nhà phát triển Python trình độ sơ cấp muốn tìm hiểu về khoa học dữ liệu'];

    const [inputWillStudyLearn, setInputWillStudyLearn] = useState(listWillLearn);
    const [inputRequirements, setInputRequirements] = useState(listRequirement);
    const [inputWhoCourse, setInputWhoCourse] = useState(listWhoCourse);

    const [willStudyLearn, setWillStudyLearn] = useState({});
    const [requirement, setRequirement] = useState({});
    const [whoCourse, setWhoCourse] = useState({});
    
    // thêm input khi nhân vào button add
    const handleAddInputWillStudyLearn = (e) => {
        setInputWillStudyLearn([...inputWillStudyLearn, listWillLearn[inputWillStudyLearn.length % listWillLearn.length]]);
    }
    const handleAddInputRequirement = () => {
        setInputRequirements([...inputRequirements, listRequirement[0]]);
    }
    const handleAddInputWhoCourse = () => {
        setInputWhoCourse([...inputWhoCourse, listWhoCourse[0]]);
    }

    const handleOnChangeWillStudyLearn = (event, index) => {
        let newValue;
        if (willStudyLearn[index]) {
            newValue = { [index]: willStudyLearn[index] + event.target.value };

        }
        newValue = { [index]: event.target.value }
        setWillStudyLearn({ ...willStudyLearn, ...newValue });
    }

    const handleOnChangeRequirement = (event, index) => {
        let newValue;
        if (requirement[index]) {
            newValue = { [index]: requirement + event.target.value };
            console.log(newValue)
        }
        newValue = { [index]: event.target.value }
        setRequirement({ ...requirement, ...newValue });
    }

    const handleWhoCourse = (e, index) => {
        let newValue;
        if (whoCourse[index]) {
            newValue = { [index]: whoCourse + e.target.value }
        }
        newValue = { [index]: e.target.value }
        setWhoCourse({ ...whoCourse, ...newValue });
    }

    return (
        <LayoutEditCourse>
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
                            <TextFieldCounter key={index} sx={{ width: '100%', height: '50px', marginBottom: theme.spacing(2) }} max={160}
                                onChange={(e) => handleOnChangeWillStudyLearn(e, index)}
                                value={willStudyLearn[index]}
                                placeHolder={placeHolder} />
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
                            <TextFieldCounter key={index} sx={{ width: '100%', height: '50px', marginBottom: theme.spacing(2) }} max={160}
                                onChange={(e) => handleOnChangeRequirement(e, index)}
                                value={requirement[index]}
                                placeHolder={placeHolder} />
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
                            <TextFieldCounter key={index} sx={{ width: '100%', height: '50px', marginBottom: theme.spacing(2) }} max={160}
                                onChange={(e) => handleWhoCourse(e, index)}
                                value={whoCourse[index]}
                                placeHolder={placeHolder} />
                        );
                    })
                }
                <Button onClick={handleAddInputWhoCourse} startIcon={<AddIcon />}>Thêm nội dung quản lý dự án</Button>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse>

    )
}