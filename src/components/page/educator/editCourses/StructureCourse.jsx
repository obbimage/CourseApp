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
export default function StructureCourse() {
    const theme = useTheme();

    return (
        <LayoutEditCourse
        >
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>
                    Cấu trúc khóa học
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
                        <Title>Khóa học có sẵn ở trong bạn. Bạn chỉ cần viết ra.</Title>
                        <Typography sx={{
                            fontSize: theme.typography.fontSize + 5
                        }
                        }>
                            Việc lập kế hoạch kỹ lưỡng cho khóa học sẽ mang lại lộ trình học tập rõ ràng cho học viên, đồng thời có ích với bạn khi bạn quay phim.
                            Hãy suy nghĩ về nội dung chi tiết của mỗi bài giảng, bao gồm kỹ năng mà bạn sẽ dạy,
                            thời lượng video ước tính, hoạt động thực hành cần thêm vào, cũng như cách bạn tạo phần giới thiệu và tóm tắt.
                        </Typography>
                    </Box>
                    <Paper elevation={1} sx={{ flexShrink: 1 }}>
                        <ImgMUI theme={theme} src={`${process.env.PUBLIC_URL}/imgs/1.png`} />
                    </Paper>
                </Box>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Title>Mẹo</Title>
                <WrapBox>
                    <Title2>
                        Bắt đầu với mục tiêu của bạn.
                    </Title2>
                    <Typography>
                        Việc đặt mục tiêu cho thành tích mà học viên sẽ đạt được trong khóa học (còn gọi là mục tiêu học tập) ngay từ đầu sẽ giúp
                        bạn xác định được nội dung cần đưa vào khóa học,
                        cũng như cách giảng dạy nội dung để giúp học viên đạt được mục tiêu đó.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Lập đề cương.
                    </Title2>
                    <Typography>
                        Quyết định loại kỹ năng mà bạn sẽ dạy và phương pháp giảng dạy.
                        Gộp nhóm những bài giảng liên quan thành các phần. Mỗi phần phải có ít nhất 3 bài giảng và bao gồm ít nhất một bài tập hoặc hoạt động thực hành.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Giới thiệu về bản thân bạn và tạo động lực.
                    </Title2>
                    <Typography>
                        Mọi người trên thế giới mạng đều muốn bắt đầu học một cách nhanh chóng. Hãy tạo phần giới thiệu để học viên cảm thấy hứng thú trong 10 phút đầu tiên.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Các phần phải có mục tiêu học tập rõ ràng.
                    </Title2>
                    <Typography>
                        Giới thiệu từng phần bằng cách mô tả mục tiêu và lý do mục tiêu này quan trọng.
                        Đặt tiêu đề bài giảng và các phần sao cho phản ánh đúng nội dung và thể hiện tính logic.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Các bài giảng đề cập đến một khái niệm
                    </Title2>
                    <Typography>
                        Thời lượng bài giảng thích hợp là từ 2-7 phút để duy trì sự hứng thú của học viên, giúp họ học trong các khoảng thời gian ngắn.
                        Bạn nên trình bày một chủ đề duy nhất trong mỗi bài giảng để học viên có thể dễ dàng tìm và xem lại sau này.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Kết hợp các loại bài giảng
                    </Title2>
                    <Typography>
                        Hãy sử dụng luân phiên giữa cảnh quay phim bản thân, màn hình của bạn, trang trình bày hoặc hình ảnh trực quan khác.
                        Việc bạn lộ diện có thể khiến học viên cảm thấy gần gũi.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Hoạt động thực hành sẽ tạo ra cách "học đi đôi với hành".
                    </Title2>
                    <Typography>
                        Giúp học viên áp dụng bài học của bạn vào thực tế thông qua các dự án, bài tập, bài tập coding hoặc phiếu bài tập.
                    </Typography>
                </WrapBox>
                <Title>Yêu cầu</Title>
                <WrapBox>
                    <ul>
                        <li>
                            Xem danh sách hoàn chỉnh về yêu cầu chất lượng khóa học
                        </li>
                        <li>
                            Khóa học của bạn phải có ít nhất năm bài giảng
                        </li>
                        <li>
                            Tất cả các bài giảng phải có tổng thời lượng video ít nhất 30 phút trở lên
                        </li>
                        <li>
                            Khóa học của bạn phải bao gồm nội dung giáo dục có giá trị,
                            không có tài liệu quảng cáo hoặc gây mất tập trung
                        </li>
                    </ul>
                </WrapBox>
            </WrapBoxEditLayoutCourse>

        </LayoutEditCourse>
    )
}