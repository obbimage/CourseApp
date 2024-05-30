import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ImageCustom from "./imageCustom";
import banner_portfolio from "../assets/images/banner_portfolio.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageUser from "../assets/images/662a66043215d.jpg";
import KeyIcon from "@mui/icons-material/Key";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Info() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        maxWidth: "1100px",
        margin: "auto",
        minHeight: "700px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <ImageCustom
          src={banner_portfolio}
          alt="banner portfolio"
          sx={{
            width: "100%",
            height: { xs: "120px", sm: "308px" },
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        />
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          sx={{
            backgroundColor: "#fff",
            color: "#4f4d4d",
            boxShadow: "none",
            position: "absolute",
            bottom: { xs: "10px", sm: "18px" },
            right: { xs: "6px", sm: "14px" },
            p: { xs: "5px 8px", sm: "10px 12px" },
            borderRadius: "6px",
            textTransform: "none",
            "&:hover": {
              opacity: "0.9 ",
              backgroundColor: "#fff",
              boxShadow: "none",
            },
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
            Chỉnh sửa ảnh bìa
          </Typography>
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "end" },
            position: "absolute",
            bottom: { xs: "-138px", sm: "-70px" },
            left: { xs: "50%", sm: "40px" },
            transform: { xs: "translateX(-50%)", sm: "translateX(0)" },
          }}
        >
          <Box
            sx={{
              width: { xs: "128px", sm: "172px" },
              height: { xs: "128px", sm: "172px" },
              borderRadius: "99px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <ImageCustom
                src={ImageUser}
                alt="image user"
                sx={{
                  width: { xs: "108px", sm: "154px" },
                  height: { xs: "108px", sm: "154px" },
                  borderRadius: "99px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: "16px", ml: "16px" }}>
            <Typography
              sx={{ fontSize: { xs: "24px", sm: "28px" }, fontWeight: "700" }}
            >
              Cai Hoang Huynh
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: "0 24px" }}>
        <Grid
          container
          sx={{
            mt: { xs: "150px", sm: "90px" },
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow:
                "0 0 5px 0 rgba(0, 0, 0, .1), 0 0 1px 0 rgba(0, 0, 0, .1)",
              wordBreak: "break-word",
              marginBottom: "20px",
              padding: "18px 14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#000",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Khóa học của tôi 666
            </Typography>
            <Divider sx={{ m: "16px 0", width: "100%", height: "1px" }} />
            <Button
              variant="outlined"
              startIcon={<KeyIcon />}
              size="small"
              sx={{
                backgroundColor: "#fff",
                color: "#4f4d4d",
                boxShadow: "none",
                p: "10px 12px",
                borderRadius: "6px",
                textTransform: "none",
                "&:hover": {
                  opacity: "0.9 ",
                  backgroundColor: "#fff",
                  boxShadow: "none",
                },
              }}
            >
              <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                Thay đổi mật khẩu
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={9} sx={{ pl: { xs: "0px", sm: "20px" } }}>
            <Box
              component="form"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow:
                  "0 0 5px 0 rgba(0, 0, 0, .1), 0 0 1px 0 rgba(0, 0, 0, .1)",
                wordBreak: "break-word",
                marginBottom: "20px",
                padding: "18px 14px",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Họ và chữ lót"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Số điện thoại"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Thành Phố"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Id User"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tên"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Địa chỉ Email"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Quận/Huyện"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                  />
                  <TextField
                    label="Giới Thiệu"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ m: "16px 0", width: "100%", height: "1px" }} />
              <Button variant="contained" endIcon={<SaveIcon />}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Info;
