// Trang tổng quan khóa học

import { Box, Typography, styled, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse, WrapContentLayoutEditCourse } from "./LayoutEditCourse";
import InputCounter from "../../../layouts/InputCounter";
import TextEditor from "../../../layouts/Editor";
import { DropDownMenu, dropDownItem } from "../../../layouts/DropDownMenu";
import { useState } from "react";
import InputFileUpload from "../../../layouts/InputFileUpload";

const heightInput = '48px';

const Img = styled('img')
    (({ theme }) => ({
        // width:'100%'
        height:'100%'
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

// const InputFile = () => {
//     return (

// )
// }
export default function LadingPage() {
    const theme = useTheme();
    const listLevel = [
        dropDownItem("Sơ cấp"),
        dropDownItem("Trung Cấp"),
        dropDownItem("Chuyên gia"),
        dropDownItem("Tất cả trình độ")
    ];
    const category = [
        dropDownItem('Phát triển'),
        dropDownItem("kinh doanh"),
        dropDownItem('Tài chính'),
        dropDownItem("CNTT"),
        dropDownItem('Thiết kế')];
    const subCateGory = [
        dropDownItem('web'),
        dropDownItem('Khoa học dữ liệu')];

    const handleSelectLevel = () => {

    }

    const handleSelectCategory = () => {

    }

    const handleSelectSubCateGory = () => {

    }
    return (
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
                        Tiêu đề khóa học
                    </Title>
                    <Box height={heightInput}>
                        <InputCounter
                            placeholder="Chọn tiêu đề khóa học" />
                    </Box>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse>
                    <Title>
                        Mô tả khóa học
                    </Title>
                    <Box>
                        <TextEditor />
                    </Box>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse>
                    <Title>
                        Thông tin cơ bản
                    </Title>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '290px' }}>
                            <DropDownMenu ListItem={listLevel}
                                onChange={handleSelectLevel} />
                        </Box>
                        <Box sx={{ width: '290px' }}>
                            <DropDownMenu ListItem={category}
                                onChange={handleSelectLevel} />
                        </Box>
                        <Box sx={{ width: '290px' }}>
                            <DropDownMenu ListItem={subCateGory}
                                handleSelectSubCateGory />
                        </Box>

                    </Box>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse>
                    <Title>
                        Khóa học của bạn chủ yếu giảng dạy nội dung nào?
                    </Title>
                    <Box sx={{ width: '450px', height: heightInput }}>
                        <InputCounter placeholder="Ví dụ nghệ thuật phong cảnh" />
                    </Box>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse>
                    <Title>Hình ảnh khóa học</Title>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box sx={{ width: '450px', height:'250px', marginRight:theme.spacing(3) }}>
                            <Img src={`${process.env.PUBLIC_URL}/imgs/4.png`} />
                        </Box>
                        <Box>
                            <Typography marginBottom={theme.spacing(3)}>
                                Tải hình ảnh khóa học lên tại đây. Để được chấp nhận,
                                hình ảnh phải đáp ứng tiêu chuẩn chất lượng hình ảnh khóa học. Hướng dẫn quan trọng:
                                750x422 pixel; .jpg, .jpeg,. gif, hoặc .png. và không có chữ trên hình ảnh.
                            </Typography>
                            <InputFileUpload label="Upload a Image" />
                        </Box>
                    </Box>
                </WrapContentLayoutEditCourse>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse>
    )
}