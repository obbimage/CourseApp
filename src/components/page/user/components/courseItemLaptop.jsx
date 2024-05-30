import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Player } from "video-react";
import courseVip1 from "../assets/images/coursevip1.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Link } from "react-router-dom";

function CourseItemLaptop({ isScrolled }) {
  return (
    <Box sx={{ position: "relative", display: { xs: "none", sm: "block" } }}>
      <Box
        sx={{
          height: "50px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: isScrolled ? 12 : 9,
          backgroundColor: "#2d2f31",
          boxShadow: 4,
          p: "8px 16px",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#fff",
                lineHeight: "1.2",
                mb: "6px",
              }}
            >
              AWS Certified Solutions Architect - Associate (Tiếng Việt)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "22px",
                  backgroundColor: "#eceb98",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
              <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#f69c08",
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
                  color: "#c0c4fc",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                (100 xếp hạng)
              </Typography>
              <Typography
                sx={{
                  display: "block",
                  color: "#fff",

                  fontSize: "14px",
                }}
              >
                672 học viên
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ position: "relative" }}>
            <Box
              sx={{
                width: "340px",
                backgroundColor: "white",
                position: "absolute",
                top: isScrolled ? "10px" : "98px",
                left: "-32px",
                boxShadow: 2,
              }}
            >
              <Player poster={courseVip1}>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </Player>
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
                  component={Link}
                  to="/course/1/learn"
                  variant="contained"
                  sx={{
                    backgroundColor: "#a435f0",
                    color: "white",
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
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#2d2f31" }}>
        <Container
          maxWidth="lg"
          sx={{
            height: "362px",

            padding: "32px 0",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={8}>
              <Box sx={{ pr: "24px" }}>
                <Typography
                  sx={{ color: "#c0c4fc", fontWeight: "700", mb: "28px" }}
                >
                  Thông tin khóa hoc
                </Typography>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1.2",
                    mb: "16px",
                  }}
                >
                  AWS Certified Solutions Architect - Associate (Tiếng Việt)
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "20px", mb: "24px" }}
                >
                  Khóa học luyện thi chứng chỉ AWS Certified Solutions Architect
                  Associate SAA-C03 (Tiếng Việt)
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    mb: "16px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100px",
                      height: "22px",
                      backgroundColor: "#eceb98",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                    sx={{ display: "flex", gap: "6px", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "#f69c08",
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
                      color: "#c0c4fc",
                      textDecoration: "underline",
                      fontSize: "14px",
                    }}
                  >
                    (100 xếp hạng)
                  </Typography>
                  <Typography
                    sx={{
                      display: "block",
                      color: "#fff",

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
                      color: "#fff",

                      fontSize: "14px",
                    }}
                  >
                    Được tạo bởi
                  </Typography>
                  <Typography
                    sx={{
                      display: "block",
                      color: "#c0c4fc",
                      textDecoration: "underline",
                      fontSize: "14px",
                    }}
                  >
                    Luu Ho Phuong
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ position: "relative" }}></Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default CourseItemLaptop;