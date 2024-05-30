import { Box, Button, Rating, Typography } from "@mui/material";
import { Player } from "video-react";
import courseVip1 from "../assets/images/coursevip1.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Link } from "react-router-dom";

function CourseItemMobile() {
  return (
    <Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Player poster={courseVip1}>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player>
        <Box sx={{ p: "24px" }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#2d2f31",
              lineHeight: "1.2",
              mb: "16px",
            }}
          >
            AWS Certified Solutions Architect - Associate (Tiếng Việt)
          </Typography>
          <Typography sx={{ color: "#2d2f31", fontSize: "16px", mb: "24px" }}>
            Khóa học luyện thi chứng chỉ AWS Certified Solutions Architect
            Associate SAA-C03 (Tiếng Việt)
          </Typography>
          <Box
            sx={{
              width: "100px",
              height: "22px",
              backgroundColor: "#eceb98",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "12px",
            }}
          >
            <Typography
              sx={{
                color: "#3d3c0a",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Bán chạy nhât
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              mb: "16px",
            }}
          >
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "#4d3105",
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "0",
                }}
              >
                4.5
              </Typography>
              <Rating
                name="read-only"
                value={5}
                readOnly
                sx={{ fontSize: "16px" }}
              />
            </Box>
            <Typography
              sx={{
                display: "block",
                color: "#5624d0",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              (100 xếp hạng)
            </Typography>
            <Typography
              sx={{
                display: "block",
                color: "#2d2f31",

                fontSize: "14px",
              }}
            >
              672 học viên
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "6px" }}>
            <Typography
              sx={{
                display: "block",
                color: "#2d2f31",

                fontSize: "14px",
              }}
            >
              Được tạo bởi
            </Typography>
            <Typography
              sx={{
                display: "block",
                color: "#5624d0",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Luu Ho Phuong
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: "24px" }}>
          <Typography
            sx={{
              display: "flex",
              color: "#2d2f31",
              fontWeight: "700",
              bottom: "12px",
              fontSize: "32px",
              width: "100%",
              mb: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "700",
                mr: "8px",
                mt: "6px",
              }}
            >
              ₫
            </Typography>{" "}
            299.000
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/course/1/learn"
            sx={{
              backgroundColor: "#a435f0",
              color: "white",
              height: "48px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#a435f0",
                opacity: 0.9,
              },
              mb: "16px",
            }}
          >
            Đăng ký khóa học
          </Button>
          <Typography
            sx={{ fontSize: "12px", textAlign: "center", mb: "18px" }}
          >
            Đảm bảo hoàn tiền trong 30 ngày
          </Typography>
          <Box>
            <Typography sx={{ mb: "12px", fontWeight: "700" }}>
              Khóa học này bao gồm:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: "16px" }} />
                <Typography sx={{ fontSize: "14px" }}>
                  23 giờ video theo yêu cầu
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <AppShortcutIcon sx={{ fontSize: "16px" }} />
                <Typography sx={{ fontSize: "14px" }}>
                  Truy cập trên thiết bị di động và TV
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <AllInclusiveIcon sx={{ fontSize: "16px" }} />
                <Typography sx={{ fontSize: "14px" }}>
                  Quyền truy cập đầy đủ suốt đời
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <AssignmentOutlinedIcon sx={{ fontSize: "16px" }} />
                <Typography sx={{ fontSize: "14px" }}>
                  Nội dung khóa học cực kỳ chi tiết
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CourseItemMobile;
