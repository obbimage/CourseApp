
import { Box, Paper, Typography, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse } from "./LayoutEditCourse";
import styled from "styled-components";
import theme from "../../../../theme";
import { grey } from "@mui/material/colors";

const ImgMUI = styled('img')
    (({ theme }) => ({
        width: '100%',
        height: '100%',
    }));

const Title = ({ children }) => {
    return (
        <Typography variant="h5" sx={{
            fontWeight: '600',
            marginBottom: theme.spacing(3)

        }}>
            {children}
        </Typography>
    );
};

const Title2 = ({ children }) => {
    return (
        <Typography sx={{
            fontWeight: '600',
            marginBottom: theme.spacing(0.3)
        }}>
            {children}
        </Typography>
    );
};

const WrapBox = ({ children }) => {

    return (
        <Box sx={{
            marginBottom: theme.spacing(2.5)
        }}>
            {children}
        </Box>
    )
}

// Trang cấu trúc kháo học
export default function SetupStudio() {
    const theme = useTheme();

    return (
        <LayoutEditCourse
        >
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>
                    Thiết lập studio và tạo video thử nghiệm
                </TitleHeaderEditCourse>
            </HeaderEditLayoutCourse>
            <WrapBoxEditLayoutCourse sx={{
                backgroundColor: grey[100],
                marginBottom: theme.spacing(4)
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: theme.spacing(3, 0),
                }}>
                    <Box sx={{
                        flexShrink: 2,
                        marginRight: theme.spacing(4)
                    }}>
                        <Title>Sắp xếp studio lý tưởng và nhận phản hồi từ sớm</Title>
                        <Typography sx={{
                            fontSize: theme.typography.fontSize + 5
                        }
                        }>
                            Điều quan trọng là bạn phải thiết lập chính xác âm thanh và video ngay từ bây giờ vì việc sửa video sau khi quay xong sẽ khó hơn nhiều. Có nhiều cách sáng tạo giúp bạn
                            sử dụng những gì mình có để tạo video có hình ảnh chuyên nghiệp.
                        </Typography>
                    </Box>
                    <Paper elevation={1} sx={{ flexShrink: 1 }}>
                        <ImgMUI theme={theme} src={`${process.env.PUBLIC_URL}/imgs/2.png`} />
                    </Paper>
                </Box>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Title>Mẹo</Title>
                <WrapBox>
                    <Title2>
                        Thiết bị đơn giản.
                    </Title2>
                    <Typography>
                        Bạn không cần phải mua thiết bị cầu kỳ. Hầu hết camera của điện thoại thông minh đều có thể quay video với chất lượng HD.
                        Bạn có thể ghi âm trên điện thoại khác hoặc dùng micrô ngoài.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Học viên cần nghe thấy tiếng của bạn.
                    </Title2>
                    <Typography>
                        Một chiếc micrô tốt là phần quan trọng nhất của thiết bị mà bạn sẽ chọn. Có rất nhiều lựa chọn có giá cả phải chăng trên thị trường.
                        Hãy đảm bảo micrô được lắp đúng cách và ở vị trí cách bạn 6-12 inch (15-30 cm).
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Xây dựng studio.
                    </Title2>
                    <Typography>
                        Dọn dẹp cảnh nền và sắp xếp đạo cụ. Chúng ta có thể biến đổi hầu hết mọi không gian
                        nhỏ bằng cách dùng phông nền làm từ giấy màu hoặc ga trải giường phẳng phiu.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Chiếu sáng cảnh quay và khuôn mặt của bạn.
                    </Title2>
                    <Typography>
                        Hãy tắt đèn trần. Thử nghiệm phương pháp chiếu sáng ba điểm bằng cách
                        đặt hai đèn ở phía trước bạn và một đèn ở phía sau hướng vào cảnh nền.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Giảm tạp âm và tiếng vọng.
                    </Title2>
                    <Typography>
                        Tắt quạt hoặc lỗ thông hơi và ghi hình lúc yên tĩnh. Đặt tấm xốp cách âm hoặc chăn lên tường,
                        trải thảm hoặc bố trí đồ nội thất để giảm tiếng vọng.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Phát huy trí sáng tạo.
                    </Title2>
                    <Typography>
                        Học viên sẽ không nhìn thấy cảnh hậu trường. Sẽ không ai biết xung quanh bạn toàn là gối dùng để cách âm...
                        trừ khi bạn tiết lộ với giảng viên khác trong cộng đồng!
                    </Typography>
                </WrapBox>
                <Title>Yêu cầu</Title>
                <WrapBox>
                    <ul>
                        <li>
                        Quay phim và xuất video có chất lượng HD để tạo video 
                        có độ phân giải ít nhất là 720p hoặc 1080p nếu có thể
                        </li>
                        <li>
                        Âm thanh phải phát ra từ cả kênh trái và kênh phải và đồng bộ hóa với video của bạn
                        </li>
                        <li>
                            Âm thanh không được có tiếng vọng và tạp âm để không làm học viên mất tập trung
                        </li>
                    </ul>
                </WrapBox>
            </WrapBoxEditLayoutCourse>

        </LayoutEditCourse>
    )
}