import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Tabs,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Player } from "video-react";
import courseVip1 from "../assets/images/coursevip1.png";
import CourseInfo from "./courseInfo";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import convertStringHtml from "./convertStringToHtml";
import ImageUser from "../assets/images/662a66043215d.jpg";
import InputBase from "@mui/material/InputBase";
import Comment from "./comment";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import NearMeIcon from "@mui/icons-material/NearMe";

const Search = styled("div")(({ theme, isFocused }) => ({
  position: "relative",
  color: "#707070",
  fontSize: "14px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#fff",
  },

  marginLeft: 0,
  width: { xs: "100%", sm: "420px" },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  borderRadius: "20px",
  border: isFocused ? "2px solid #444" : "2px solid #ccc",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  width: "90%",
}));

function CourseLearn() {
  const [value, setValue] = useState("2");
  const [valueRating, setValueRating] = useState("5");
  const [videoActive, setVideoActive] = useState("1");
  const [imageVideo, setImageVideo] = useState(courseVip1);
  const [urlVideo, setUrlVideo] = useState(
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //navigate(`/search?course-name=${searchValue}`);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Grid
        container
        spacing={0}
        sx={{
          position: "fixed",
          top: "66px",
          right: 0,
          height: "0",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Grid item xs={12} md={9} sx={{}}></Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
              backgroundColor: "#fff",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#2d2f31",
                p: "16px 0px 16px 16px",
              }}
            >
              Nội dung khóa học
            </Typography>
            <CourseInfo
              videoActive={videoActive}
              setVideoActive={setVideoActive}
              setUrlVideo={setUrlVideo}
              setImageVideo={setImageVideo}
              isBuy={true}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{}}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              backgroundColor: "#2d2f31",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ height: { xs: "100%", sm: "400px" }, width: "710px" }}>
              {urlVideo && (
                <Player poster={imageVideo} className="video-custom">
                  <source src={urlVideo} />
                </Player>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              typography: "body1",
              p: { xs: "0", sm: "0 24px" },
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Nội dung khóa học"
                    value="1"
                    sx={{
                      display: { xs: "flex", sm: "none" },
                      fontWeight: "700",
                    }}
                  />
                  <Tab
                    label="Tổng quan"
                    value="2"
                    sx={{
                      fontWeight: "700",
                    }}
                  />
                  <Tab
                    label="Đánh giá"
                    value="3"
                    sx={{
                      fontWeight: "700",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                sx={{
                  display: { xs: "block", sm: "none" },
                  padding: "0px",
                }}
              >
                <CourseInfo />
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  padding: "0px",
                  mt: "24px",
                }}
              >
                {" "}
                <Box
                  sx={{
                    mb: "22px",
                    width: { sm: "700px" },
                    padding: "0 24px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#2d2f31",
                      mb: "14px",
                    }}
                  >
                    Giới thiệu về khóa học
                  </Typography>
                  <Box
                    sx={{
                      mb: "34px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#2d2f31",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      HTML5 for web development essential HTML from scratch.
                      With this HTML course, you don't need previous knowledge
                      of HTML
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Grid container spacing={0} sx={{ p: "24px" }}>
                  <Grid item xs={12} md={3}>
                    Mô tả
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box>
                      {convertStringHtml("")}
                      <Typography
                        sx={{
                          fontWeight: "700",
                          mb: "8px",
                          textAlign: "justify",
                        }}
                      >
                        Chào mừng đến với khoá học AWS Cloud for beginner -
                        Tiếng Việt!
                      </Typography>
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "700", mb: "8px" }}
                      >
                        ----Giới thiệu về giảng viên----
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          mb: "8px",
                          textAlign: "justify",
                        }}
                      >
                        Hiện đang là AWS Cloud Solution Architect, Engineering
                        Consultant chuyên phụ trách các KH thị trường Nhật.
                        <br /> Làm việc với Cloud & AWS từ năm 2015 với vai trò
                        Cloud Engineer và từ 2018 với vai trò Cloud Solution
                        Architect.
                        <br /> Có kinh nghiệm thực chiến trong việc tư vấn,
                        thiết kế và triển khai các hệ thống lớn quy mô hàng
                        triệu user trên toàn thế giới. Chịu trách nhiệm cao nhất
                        về kiến trúc cũng như giải pháp cho các dự án, đảm bảo
                        hệ thống được thiết kế, xây dựng và release tới khách
                        hàng và end-user với chất lượng cao nhất.
                      </Typography>
                      <Typography
                        sx={{ fontSize: "14px", textAlign: "justify" }}
                      >
                        Chứng chỉ AWS hiện có:
                      </Typography>
                      <ul>
                        <li>
                          <Typography sx={{ fontSize: "14px" }}>
                            AWS Solution Architect Professional (2020, 2023)
                          </Typography>
                        </li>
                        <li>
                          <Typography sx={{ fontSize: "14px" }}>
                            AWS Solution Architect Associate (2018)
                          </Typography>
                        </li>
                        <li>
                          <Typography sx={{ fontSize: "14px" }}>
                            AWS Developer Associate (2015)
                          </Typography>
                        </li>
                      </ul>
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "700", mb: "8px" }}
                      >
                        ----Về khoá học AWS Cloud for beginner---
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          mb: "8px",
                          textAlign: "justify",
                        }}
                      >
                        Bạn đang là IT, Software Engineer hoặc sinh viên đang
                        muốn bắt đầu hành trình trên Cloud của mình, hoặc bạn
                        muốn học thêm những kiến thức liên quan AWS nói riêng
                        phục vụ cho công việc hằng ngày cũng như tìm kiếm cơ hội
                        mới. Khoá học này đích thực dành cho bạn! Khoá học này
                        tập trung vào những kiến thưc cơ bản liên quan tới Cloud
                        Computing và AWS, lịch sử hình thành và phát triển của
                        AWS, các dịch vụ cơ bản trên AWS, đặc trưng và tình
                        huống vận dụng của cá dịch vụ. Khoá học thiết kế đan xen
                        giữa lý thuyết và thực hành, giúp các bạn không chỉ nắm
                        rõ các dịch vụ của AWS mà còn tự tin thao tác với chúng,
                        có thể vận dụng trong dự án thực tế cũng như phát triển
                        sản phẩm của riêng bạn.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={0} sx={{ p: "24px" }}>
                  <Grid item xs={12} md={3}>
                    Giảng viên
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box
                      sx={{
                        mb: "22px",
                        width: { sm: "700px" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "24px",
                          mb: "14px",
                        }}
                      >
                        <Avatar
                          alt="Nguyen Sinh Tien"
                          src={ImageUser}
                          sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              color: "#5624d0",
                              textDecoration: "none",
                              fontWeight: "600",
                              fontSize: "18px",
                            }}
                          >
                            Linh Nguyen
                          </Typography>
                          <Typography
                            sx={{
                              color: "#6a6f7a",
                            }}
                          >
                            Engineering Consultant, AWS Cloud Solution Architect
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          color: "#2d2f31",
                          fontSize: "14px",
                          lineHeight: "2",
                          textAlign: "justify",
                        }}
                      >
                        I have been working with Cloud (main AWS) since 2015 and
                        5 year working and living in Japan.
                        <br /> Language: Japanese (Business Intermediate level),
                        English (Intermediate).
                        <br /> Certificates: AWS Certified Solution Architect
                        Professional (since 2018, re-new 2023).
                        <br /> Other: AWS Community Builder (since 2023).
                        <br /> As a Cloud Solution Architect (SA), I can provide
                        solutions for customer during system design, development
                        and deployment.
                        <br /> I also contribute to community by many activities
                        like Youtube channel, on-demand private training course
                        and now on Udemy. Nice to make friend with all of you.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      mb: "24px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#2d2f31",
                        fontSize: { sm: "24px" },
                        fontWeight: "700",
                      }}
                    >
                      Phản hồi của học viên
                    </Typography>
                    <CircleIcon sx={{ fontSize: "8px", color: "#6a6f73" }} />
                    <Typography
                      sx={{
                        color: "#2d2f31",
                        fontSize: { sm: "24px" },
                        fontWeight: "700",
                      }}
                    >
                      4.6
                    </Typography>
                    <StarIcon sx={{ color: "#b4690e" }} />
                  </Box>
                  <Search isFocused={isFocused}>
                    <StyledInputBase
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={handleSearch}
                      onKeyPress={handleKeyPress}
                      value={searchValue}
                      placeholder="Nhập bình luận ví dụ: khóa học rất hay..."
                      inputProps={{ "aria-label": "search" }}
                    />
                    {isValue && (
                      <Button
                        sx={{
                          backgroundColor: "#2d2f31",
                          p: "6px",
                          width: "80px",
                          height: "34px",
                          borderRadius: "20px",
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#2d2f31 !important",
                            opacity: 0.9,
                          },
                        }}
                      >
                        <NearMeIcon />
                      </Button>
                    )}
                  </Search>
                  <Box
                    sx={{
                      pl: "24px",
                      mt: "16px",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                      Đánh giá số sao:{" "}
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      value={valueRating}
                      onChange={(event, newValue) => {
                        setValueRating(newValue);
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: "24px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ minWidth: "320px" }}>
                        <Comment ImageUser={ImageUser} />
                      </Grid>
                      <Grid item xs={12} sx={{ minWidth: "320px" }}>
                        <Comment ImageUser={ImageUser} />
                      </Grid>
                      <Grid item xs={12} sx={{ minWidth: "320px" }}>
                        <Comment ImageUser={ImageUser} />
                      </Grid>
                      <Grid item xs={12} sx={{ minWidth: "320px" }}>
                        <Comment ImageUser={ImageUser} />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid
          sx={{ display: { xs: "none", sm: "block" } }}
          item
          xs={12}
          md={3}
        ></Grid>
      </Grid>
    </Box>
  );
}

export default CourseLearn;
