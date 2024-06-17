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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { insertBuy } from "../../../../api/buy";
import { handleApiRequest, handleApiResponse } from "../../../../api/instance";
import { AlertFeddback } from "../../../feedback/AlertFeedback";
import { CurrentUserContext } from "../../../../App";
import { isObjEmpty } from "../../../../util/object";
import { getUrlVnpay } from "../../../../api/pay/vnpay";
import { StringLink } from "../../../../static/StringLink";


function CourseItemLaptop({ isScrolled, value, isBuy }) {
  const [course, setCourse] = useState(value);

  const [alert, setAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState('success');
  const [isBuyState, setIsBuyState] = useState(false)
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [urlPay,setUrlPay] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setCourse(value);
  }, [value]);

  useEffect(() => {
    setIsBuyState(isBuy);
    console.log('isBuy: ', isBuy);
  }, [isBuy]);

  useEffect(()=>{
    console.log('is buyState: ', isBuyState);
  },[isBuyState]);

  const handleBuyCourse = () => {
    let courseId = course.id;
    // kiểm tra đã đăng nhập hay chưa
    // if (!isObjEmpty(currentUser)) {
    //   let useId = currentUser.id;
    //   insertBuy(useId, courseId)
    //     .then(response => {
    //       handleApiResponse(response,
    //         // success
    //         (buyResponse) => {
    //           navigate('/storage');
    //         },
    //         // falied
    //         (err) => {
    //           setAlert("Thanh toán thất bại");
    //           setSeverityAlert("error");
    //           setOpenAlert(true);
    //         }
    //       )
    //     })
    // } else {
    //   navigate('/login');
    // }


    if(!isObjEmpty(currentUser)){
      let userId = currentUser.id;
      getUrlVnpay(StringLink.urlWeb+"/payment",userId,courseId)
      .then(response=>{
        handleApiResponse(response,
          // success
          (urlPayResponse)=>{
            setUrlPay(urlPayResponse);
            window.location.href = urlPayResponse;
          }
        )
      })
    }else{
      navigate('/login');
    }
  }
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
        <AlertFeddback
          open={openAlert}
          severity={severityAlert}
          alert={alert}
        />
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
              {/* {course.name}  dfdfsdf */}
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
              <Player poster={course?.img || `${process.env.PUBLIC_URL}/imgs/logoCourse.png`}>
                {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
                <source src={course.clipDemo} />
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
                    {/* ₫ */}
                  </Typography>{" "}
                  { isBuy || course.price}
                </Typography>

                {isBuyState ? (
                  <Button
                    component={Link}
                    to={`/course/${course.id}/learn`}
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
                    Khóa học đã đăng ký
                  </Button>
                ) : (
                  <Button
                    onClick={handleBuyCourse}
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
                )}
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
                  {course.name}
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "20px", mb: "24px" }}
                >
                  {course?.summary}
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
                    {`${course?.user?.lastName} ${course?.user?.firstName}`}
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
