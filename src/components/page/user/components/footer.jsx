import { Box, Container, Grid, Typography } from "@mui/material";
import ImageCustom from "./imageCustom";
import logoImage from "../assets/images/f8-icon.18cd71cfcfa33566a22b.png";
import socialFooter from "../assets/images/socialFooter.png";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#181821",
        color: "#a9b3bb",
        overflow: "hidden",
        padding: "68px 0 40px",
        mt: "40px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
                <ImageCustom
                  src={logoImage}
                  alt="avatar"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    mr: "24px",
                    cursor: "pointer",
                  }}
                />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Học Lập Trình Để Đi Làm
                </Typography>
              </Box>
              <Typography>Điện thoại: 0246.329.1102</Typography>
              <Typography>Email: contact@fullstack.edu.vn</Typography>
              <Typography>
                Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận
                Cầu Giấy, TP. Hà Nội
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",

                mt: "8px",
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}
              >
                VỀ F8
              </Typography>
              <Typography>Giới thiệu</Typography>
              <Typography>Liên hệ</Typography>
              <Typography>Điều khoản</Typography>
              <Typography>Bảo mật</Typography>
              <Typography>Cơ hội việc làm</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",

                mt: "8px",
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}
              >
                SẢN PHẨM
              </Typography>
              <Typography>Game Nester</Typography>
              <Typography>Game CSS Diner</Typography>
              <Typography>Game CSS Selectors</Typography>
              <Typography>Game Froggy</Typography>
              <Typography>Game Froggy Pro</Typography>
              <Typography>Game Scoops</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",

                mt: "8px",
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}
              >
                CÔNG CỤ
              </Typography>
              <Typography>Tạo CV xin việc</Typography>
              <Typography>Rút gọn liên kết</Typography>
              <Typography>Clip-path maker</Typography>
              <Typography>Snippet generator</Typography>
              <Typography>CSS Grid generator</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",

                mt: "8px",
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}
              >
                CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8
              </Typography>
              <Typography>Mã số thuế: 0109922901</Typography>
              <Typography>Ngày thành lập: 04/03/2022</Typography>
              <Typography>
                Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát
                triển những sản phẩm mang lại giá trị cho cộng đồng.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            mt: "20px",
          }}
        >
          <Typography>
            © 2018 - 2024 F8. Nền tảng học lập trình hàng đầu Việt Nam
          </Typography>
          <Box>
            <ImageCustom src={socialFooter} sx={{ height: "36px" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
