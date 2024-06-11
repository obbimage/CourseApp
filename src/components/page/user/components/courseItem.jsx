import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Container, Grid, useScrollTrigger } from "@mui/material";
import CourseItemLaptop from "./courseItemLaptop";
import CheckIcon from "@mui/icons-material/Check";
import CourseInfo from "./courseInfo";
import CircleIcon from "@mui/icons-material/Circle";
import convertStringHtml from "./convertStringToHtml";
import CourseList from "./courseList";
import ImageUser from "../assets/images/662a66043215d.jpg";
import StarIcon from "@mui/icons-material/Star";
import Comment from "./comment";
import CourseItemMobile from "./courseItemMobile";
import { useLocation, useSearchParams } from "react-router-dom";
import { getCourseById, isBuyCourse } from "../../../../api/course";
import { handleApiRequest, handleApiResponse } from "../../../../api/instance";
import { getWhoCourseByCourseId } from "../../../../api/whoCourse";
import { getStudyWillLearnByCourseId } from "../../../../api/studyWillLearn";
import { getUnitsByCourseId } from "../../../../api/unit";
import { CurrentUserContext } from "../../../../App";
import { isObjEmpty } from "../../../../util/object";
import { getRatesByCourseId } from "../../../../api/rate";

function CourseItem() {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 120,
  });

  const location = useLocation();

  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

  const [videoActive, setVideoActive] = React.useState();
  const [imageVideo, setImageVideo] = React.useState("");
  const [urlVideo, setUrlVideo] = React.useState();

  const [course, setCourse] = React.useState({});
  const [rates, setRate] = React.useState([]);
  const [whoCourses, setWhoCourses] = React.useState([]);
  const [studentWillLearns, setStudentWillLearns] = React.useState([]);
  const [units, setUnit] = React.useState([]);

  // kiểm tra khóa học đã được mua hay chưa
  const [isBuy, setIsBuy] = React.useState(false);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseIdParam = searchParams.get("course_id");

    getCourseById(courseIdParam)
      .then(response => {
        handleApiResponse(response,
          // success
          (courseResponse) => {
            setCourse(courseResponse);
          }
        )
      });
  }, []);

  React.useEffect(() => {
    // kiểm tra đã login hay chưa
    console.log('currentUser: ', currentUser)
    if (!isObjEmpty(currentUser) && currentUser) {
      let course_id = course?.id;
      let user_id = currentUser.id;
      // lấy thông tin khóa học
      isBuyCourse(course_id, user_id)
        .then(response => {
          handleApiResponse(response,
            // success
            (isResult) => {
              setIsBuy(isResult);
              console.log(isResult)
            }
          )
        });
      // lấy đánh giá khóa học
      getRatesByCourseId(course_id)
        .then(response => {
          handleApiResponse(response,
            // sucess
            (ratesResponse) => {
              setRate(ratesResponse);
            }
          )
        })

    }
  }, [course])

  React.useEffect(() => {
    let courseId = course.id;
    if (courseId) {
      // get whose course
      getWhoCourseByCourseId(courseId)
        .then(response => {
          handleApiResponse(response,
            // success
            (whoCourseResponse) => {
              console.log('whoCourse: ', whoCourseResponse)
              setWhoCourses(whoCourseResponse)
            }
          )
        });
      // get content will learn
      getStudyWillLearnByCourseId(courseId)
        .then(response => {
          handleApiResponse(response,
            (studentWillLearnResponse) => {
              setStudentWillLearns(studentWillLearnResponse);
            }
          )
        })

      getUnitsByCourseId(courseId)
        .then(response => {
          handleApiResponse(response,
            //success
            (unitsResponse) => {
              setUnit(unitsResponse);
            }
          )
        })
    }
  }, [course]);

  return (
    <Box sx={{ position: "relative", minHeight: "2000px" }}>
      <CourseItemLaptop value={course} isBuy={isBuy} isScrolled={isScrolled} />
      <CourseItemMobile />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                mt: "32px",
                border: "1px solid #d1d7dc",
                width: { sm: "700px" },
              }}
            >
              <Box sx={{ p: "24px" }}>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "700", color: "#2d2f31" }}
                >
                  Nội dung bài học
                </Typography>
                <Grid container spacing={2} sx={{ mt: "2px" }}>
                  {studentWillLearns.map(willLearn => {
                    return (
                      <Grid
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                        item
                        xs={12}
                        md={6}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                          }}
                        >
                          <CheckIcon sx={{ fontSize: "16px" }} />
                          <Typography sx={{ fontSize: "14px" }}>
                            {willLearn.content}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "32px",

                width: { sm: "700px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#2d2f31",
                  mb: "24px",
                }}
              >
                Nội dung khóa học
              </Typography>
              <CourseInfo
                value={units}
                videoActive={videoActive}
                setVideoActive={setVideoActive}
                setUrlVideo={setUrlVideo}
                setImageVideo={setImageVideo}
              />
            </Box>
            <Box
              sx={{
                mt: "32px",

                width: { sm: "700px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#2d2f31",
                  m: "8px 0",
                }}
              >
                Yêu cầu
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    p: "8px",
                    cursor: "pointer",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "10px" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    Có kiến thức cơ bản về IT tuy nhiên không bắt buộc.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    p: "8px",
                    cursor: "pointer",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "10px" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    Bạn không cần phải biết code vì tất cả code mẫu được cung
                    cấp bởi giảng viên.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    p: "8px",
                    cursor: "pointer",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "10px" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    Những bạn có kiến thức cơ bản về server như Linux, Windows
                    có khả năng sẽ học nhanh hơn.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "32px",

                width: { sm: "700px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#2d2f31",
                  m: "8px 0",
                }}
              >
                Mô tả
              </Typography>
              <Box>
                {convertStringHtml(String(course.description))}
              </Box>
            </Box>
            <Box
              sx={{
                mt: "32px",
                mb: "22px",
                width: { sm: "700px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#2d2f31",
                  m: "8px 0",
                }}
              >
                Đối tượng của khóa học này:
              </Typography>
              <Box>
                {whoCourses.map(whoCourse => {
                  return (
                    <Box key={whoCourse.id}
                      sx={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        p: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <CircleIcon sx={{ fontSize: "6px" }} />
                      <Typography sx={{ fontSize: "14px" }}>
                        {whoCourse?.whoCourse}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box sx={{ ml: { sm: "-24px", xs: "0" } }}>
              <CourseList
                isNew={true}
                title={"Học viên cũng mua"}
                isPrice={true}
                isStuded={false}
              />
            </Box>
            <Box
              sx={{
                mt: "32px",
                mb: "22px",
                width: { sm: "700px" },
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
                Giảng viên
              </Typography>
              <Box
                sx={{
                  mb: "34px",
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
                      {`${course.user?.lastName} ${course.user?.firstName}`}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6a6f7a",
                      }}
                    >
                      {`${course.user?.educator?.biography}`}
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
                  {`${course.user?.educator?.description}`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  mb: "24px",
                }}
              >
                <StarIcon sx={{ color: "#b4690e" }} />
                <Typography
                  sx={{
                    color: "#2d2f31",
                    fontSize: { sm: "24px" },
                    fontWeight: "700",
                  }}
                >
                  4,8 xếp hạng khóa học
                </Typography>
                <CircleIcon sx={{ fontSize: "8px", color: "#6a6f73" }} />
                <Typography
                  sx={{
                    color: "#2d2f31",
                    fontSize: { sm: "24px" },
                    fontWeight: "700",
                  }}
                >
                  {`${rates.length } xếp hạng`}
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {rates.map(rateItem => {
                    return (
                      <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                        <Comment rate={rateItem} ImageUser={ImageUser} />
                      </Grid>
                    );
                  })}
                  <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                    <Comment ImageUser={ImageUser} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                    <Comment ImageUser={ImageUser} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                    <Comment ImageUser={ImageUser} />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CourseItem;
