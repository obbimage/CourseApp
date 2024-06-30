import CircleIcon from "@mui/icons-material/Circle";
import NearMeIcon from "@mui/icons-material/NearMe";
import StarIcon from "@mui/icons-material/Star";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Typography,
  ratingClasses,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Tab from "@mui/material/Tab";
import { alpha, styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../../../App";
import { getCourseById, getCourseFromBuy } from "../../../../api/course";
import { handleApiResponse } from "../../../../api/instance";
import { getRatesByCourseId, insertRate } from "../../../../api/rate";
import { getUnitsByCourseId } from "../../../../api/unit";
import { isObjEmpty } from "../../../../util/object";
import Video from "../../../video/Video";
import ImageUser from "../assets/images/662a66043215d.jpg";
import courseVip1 from "../assets/images/coursevip1.png";
import Comment from "./comment";
import convertStringHtml from "./convertStringToHtml";
import CourseInfo from "./courseInfo";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import QuestionCourse from "./questionCourse";

const drawerWidth = 340;

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

  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState({});
  const [units, setUnits] = useState([]);
  const [rates, setRate] = useState([]); // danh sach đánh giá
  const [unit, setUnit] = useState("");
  const [systemName, setSystemName] = useState("");

  const [rateNew, setRateNew] = useState({ rate: 5 });

  const params = useParams();
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    let idCourse = params.courseId;
    if (idCourse) {
      setCourseId(idCourse);
    }
  }, []);

  useEffect(() => {
    if (!isObjEmpty(currentUser)) {
      getCourseById(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (courseResponse) => {
            setCourse(courseResponse);
            console.log("course by id ", courseResponse);
          }
        );
      });

      // lấy thông tin khóa học
      getCourseFromBuy(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (courseResponse) => {
            setCourse(courseResponse);
            console.log("course: ", courseResponse);
          }
        );
      });

      // lấy nội dùng khóa học
      getUnitsByCourseId(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (unitsResponse) => {
            setUnits(unitsResponse);
            console.log("lay noi dung koa hoc", unitsResponse);
          }
        );
      });

      // lấy danh sách đánh giá
      getRatesByCourseId(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (rateResponse) => {
            setRate(rateResponse);
            console.log("rate response: ", rateResponse);
          }
        );
      });
    }
  }, [courseId]);

  useEffect(() => {
    console.log(urlVideo);
  }, [urlVideo]);

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

  const handleComment = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
    let value = e.target.value;
    setRateNew({
      ...rateNew,
      comment: value,
    });
    // setRate([
    //   ...rates,setRateNew
    // ])
  };

  const handleUrlVideo = (url) => {
    console.log(url);
    setUrlVideo(url);
  };

  const handleAddRate = () => {
    console.log("rate new: ", rateNew);

    insertRate(courseId, rateNew).then((response) => {
      handleApiResponse(
        response,
        // success
        (responseData) => {
          console.log("inser rate success:", responseData);
          setRate([responseData, ...rates]);
        }
      );
    });
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            mr: `${drawerWidth}px`,
          }}
        ></AppBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default" }}
        >
          <Box
            sx={{
              backgroundColor: "#2d2f31",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ height: { xs: "100%", sm: "400px" }, width: "100%" }}>
              {urlVideo && (
                <Video
                  source={urlVideo}
                  poster={imageVideo}
                  className="video-custom"
                />
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
                  <Tab
                    label="Thảo luận"
                    value="4"
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
                <CourseInfo
                  value={units}
                  videoActive={videoActive}
                  setVideoActive={setVideoActive}
                  setUrlVideo={handleUrlVideo}
                  setImageVideo={setImageVideo}
                  isBuy={true}
                  setUnit={setUnit}
                  setSystemName={setSystemName}
                />
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
                    {course?.name}
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
                      {course?.summary}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Grid container spacing={0} sx={{ p: "24px" }}>
                  <Grid item xs={12} md={3}>
                    Mô tả
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box>{convertStringHtml(course?.description || "")}</Box>
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
                          src={course?.user?.avatar || ImageUser}
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
                            {`${course?.user?.lastName} ${course?.user?.firstName}`}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#6a6f7a",
                            }}
                          >
                            {`${course?.user?.educator?.biography} `}
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
                        {`${course?.user?.educator?.description} `}
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
                      onChange={handleComment}
                      onKeyPress={handleKeyPress}
                      value={searchValue}
                      placeholder="Nhập bình luận ví dụ: khóa học rất hay..."
                      inputProps={{ "aria-label": "search" }}
                    />
                    {isValue && (
                      <Button
                        onClick={handleAddRate}
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
                        setRateNew({
                          ...rateNew,
                          rate: newValue,
                        });
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: "24px" }}>
                    <Grid container spacing={2}>
                      {rates.map((rateItem) => {
                        return (
                          <Grid item xs={12} sx={{ minWidth: "320px" }}>
                            <Comment rate={rateItem} ImageUser={ImageUser} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value="4">
                <QuestionCourse
                  courseId={courseId}
                  currentUser={currentUser}
                  idActor={course?.user?.id}
                  unit={unit}
                  systemName={systemName}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        <Drawer
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
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
              value={units}
              videoActive={videoActive}
              setVideoActive={setVideoActive}
              setUrlVideo={handleUrlVideo}
              setImageVideo={setImageVideo}
              isBuy={true}
              setUnit={setUnit}
              setSystemName={setSystemName}
            />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default CourseLearn;
