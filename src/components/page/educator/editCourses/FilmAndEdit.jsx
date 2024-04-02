
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
export default function FilmAdnEdit() {
    const theme = useTheme();

    return (
        <LayoutEditCourse
        >
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>
                    Quay phim và chỉnh sửa
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
                        <Title>Bạn đã sẵn sàng để chia sẻ kiến thức.</Title>
                        <Typography sx={{
                            fontSize: theme.typography.fontSize + 5
                        }
                        }>
                            Đây là thời điểm để bạn tỏa sáng! Nếu bạn đã lập dàn ý cho khóa học và làm theo hướng dẫn của chúng tôi,
                            thì bạn đã chuẩn bị tốt cho buổi ghi hình thực sự. Hãy bình tĩnh, dành thời gian để ghi hình đúng cách và tinh chỉnh cảnh quay khi bạn chỉnh sửa.
                        </Typography>
                    </Box>
                    <Paper elevation={1} sx={{ flexShrink: 1, maxWidth: '320px' }}>
                        <ImgMUI theme={theme} src={`${process.env.PUBLIC_URL}/imgs/3.png`} />
                    </Paper>
                </Box>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Title>Mẹo</Title>
                <WrapBox>
                    <Title2>
                        Nghỉ ngơi và xem lại thường xuyên.
                    </Title2>
                    <Typography>
                        Thường xuyên kiểm tra bất kỳ sự thay đổi nào, chẳng hạn như tạp âm mới.
                        Chú ý đến mức năng lượng của riêng bạn vì việc quay phim có thể khiến bạn kiệt sức và điều đó sẽ thể hiện trên màn hình.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Xây dựng mối quan hệ.
                    </Title2>
                    <Typography>
                        Học viên muốn biết người nào đang dạy họ. Ngay cả đối với khóa học chủ yếu là bài giảng quay màn hình,
                        hãy ghi hình bản thân bạn cho phần giới thiệu. Hoặc bạn có thể cố gắng hơn nữa là ghi hình bản thân bạn giới thiệu từng phần bài giảng!
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Cần thực hành để xuất hiện trước camera.
                    </Title2>
                    <Typography>
                        Giao tiếp bằng mắt với camera và phát âm rõ ràng. Quay lại nhiều lần cho đến khi bạn thấy ổn.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Chuẩn bị để chỉnh sửa video thành công.
                    </Title2>
                    <Typography>
                        Bạn có thể chỉnh sửa những đoạn tạm dừng kéo dài, sai sót và những tiếng "à" hoặc "ờ".
                        Ghi hình thêm một vài hoạt động hoặc chụp thêm ảnh mà bạn có thể thêm vào sau này để che đi những đoạn cắt đó.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Tạo dấu âm thanh.
                    </Title2>
                    <Typography>
                        Vỗ tay khi bạn bắt đầu mỗi phân cảnh để dễ dàng xác định vị trí âm thanh tăng đột biến trong quá trình chỉnh sửa.
                        Hãy sử dụng hướng dẫn của chúng tôi để quản lý ngày ghi hình của bạn một cách hiệu quả.
                    </Typography>
                </WrapBox>
                <WrapBox>
                    <Title2>
                        Đối với bài giảng quay màn hình, hãy dọn dẹp màn hình.
                    </Title2>
                    <Typography>
                        Di chuyển các file và thư mục không liên quan khỏi màn hình và mở trước bất kỳ tab nào.
                        Tạo văn bản trên màn hình có kích thước tối thiểu 24 pt và sử dụng tính năng thu phóng để làm nổi bật nội dung.
                    </Typography>
                </WrapBox>
                <Title>Yêu cầu</Title>
                <WrapBox>
                    <ul>
                        <li>
                            Quay phim và xuất video có chất lượng HD để tạo video có độ phân giải ít nhất là 720p hoặc 1080p nếu có thể
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