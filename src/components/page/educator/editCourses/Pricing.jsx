import { Box, Button, Typography, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse, WrapContentLayoutEditCourse } from "./LayoutEditCourse";
import { DropDownMenu, dropDownItem } from "../../../layouts/DropDownMenu";

const Title = ({ children }) => {

    return (
        <Typography>
            {children}
        </Typography>
    )
}

export default function Pricing() {
    const theme = useTheme();
    const currency = [
        dropDownItem('VND'),
    ];
    const price = [
        dropDownItem('Miễn phí')
    ];

    return (
        <LayoutEditCourse>
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>
                    Định giá
                </TitleHeaderEditCourse>
            </HeaderEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <WrapContentLayoutEditCourse>
                    <Title>Đặt giá cho khóa học của bạn</Title>
                    <Typography>
                        Vui lòng chọn đơn vị tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp miễn phí khóa học của mình thì khóa học đó phải
                        có tổng thời lượng video dưới 2 giờ. Ngoài ra, các khóa học có bài kiểm tra thực hành không thể miễn phí.
                    </Typography>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse >
                    <Box sx={{
                        display:'flex'
                    }}>
                        <Box width='100px' marginRight={theme.spacing(10)}>
                            <DropDownMenu ListItem={currency}
                            label={<Typography fontWeight='600'>Tiền tệ</Typography>} />
                        </Box>
                        <Box width='215px'>
                            <DropDownMenu ListItem={price}
                            label={<Typography fontWeight='600'>Mức giá</Typography>} />
                        </Box>
                    </Box>
                </WrapContentLayoutEditCourse>
                <WrapContentLayoutEditCourse>
                    <Button variant="contained">
                        Lưu
                    </Button>
                </WrapContentLayoutEditCourse>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse>
    )
}