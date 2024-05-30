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

function CourseItem() {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 120,
  });

  const [videoActive, setVideoActive] = React.useState();
  const [imageVideo, setImageVideo] = React.useState("");
  const [urlVideo, setUrlVideo] = React.useState();

  return (
    <Box sx={{ position: "relative", minHeight: "2000px" }}>
      <CourseItemLaptop isScrolled={isScrolled} />
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
                        Nắm vứng các khái niệm về Cloud Computing & AWS
                      </Typography>
                    </Box>
                  </Grid>
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
                        Có kiến thức cơ bản về các dịch vụ AWS (Networking,
                        Compute, Storage, Database, Container...)
                      </Typography>
                    </Box>
                  </Grid>
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
                        Tự tin tạo, cấu hình cũng như thao tác với các dịch vụ
                        AWS thường dùng.
                      </Typography>
                    </Box>
                  </Grid>
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
                        Có khả năng tự thiết kế hệ thống trên AWS theo tiêu
                        chuẩn Best Practice.
                      </Typography>
                    </Box>
                  </Grid>
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
                        Handson lab: tất cả các section đều có handson lab giúp
                        bạn áp dụng kiến thức vào thực tế.
                      </Typography>
                    </Box>
                  </Grid>
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
                        Trang bị kiến thức cần thiết để chuẩn bị thi chứng chỉ
                        SAA & DVA
                      </Typography>
                    </Box>
                  </Grid>
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
                {convertStringHtml("")}
                <Typography
                  sx={{ fontWeight: "700", mb: "8px", textAlign: "justify" }}
                >
                  Chào mừng đến với khoá học AWS Cloud for beginner - Tiếng
                  Việt!
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "700", mb: "8px" }}
                >
                  ----Giới thiệu về giảng viên----
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", mb: "8px", textAlign: "justify" }}
                >
                  Hiện đang là AWS Cloud Solution Architect, Engineering
                  Consultant chuyên phụ trách các KH thị trường Nhật.
                  <br /> Làm việc với Cloud & AWS từ năm 2015 với vai trò Cloud
                  Engineer và từ 2018 với vai trò Cloud Solution Architect.
                  <br /> Có kinh nghiệm thực chiến trong việc tư vấn, thiết kế
                  và triển khai các hệ thống lớn quy mô hàng triệu user trên
                  toàn thế giới. Chịu trách nhiệm cao nhất về kiến trúc cũng như
                  giải pháp cho các dự án, đảm bảo hệ thống được thiết kế, xây
                  dựng và release tới khách hàng và end-user với chất lượng cao
                  nhất.
                </Typography>
                <Typography sx={{ fontSize: "14px", textAlign: "justify" }}>
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
                  sx={{ fontSize: "14px", mb: "8px", textAlign: "justify" }}
                >
                  Bạn đang là IT, Software Engineer hoặc sinh viên đang muốn bắt
                  đầu hành trình trên Cloud của mình, hoặc bạn muốn học thêm
                  những kiến thức liên quan AWS nói riêng phục vụ cho công việc
                  hằng ngày cũng như tìm kiếm cơ hội mới. Khoá học này đích thực
                  dành cho bạn! Khoá học này tập trung vào những kiến thưc cơ
                  bản liên quan tới Cloud Computing và AWS, lịch sử hình thành
                  và phát triển của AWS, các dịch vụ cơ bản trên AWS, đặc trưng
                  và tình huống vận dụng của cá dịch vụ. Khoá học thiết kế đan
                  xen giữa lý thuyết và thực hành, giúp các bạn không chỉ nắm rõ
                  các dịch vụ của AWS mà còn tự tin thao tác với chúng, có thể
                  vận dụng trong dự án thực tế cũng như phát triển sản phẩm của
                  riêng bạn.
                </Typography>
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
                <Box
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
                    Sinh viên, Lập trình viên, Kỹ sư hệ thống đang muốn tìm hiểu
                    về Cloud cũng như AWS
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
                  <CircleIcon sx={{ fontSize: "6px" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    Các bạn đang có nhu cầu nâng cao kỹ năng cũng như tìm kiếm
                    cơ hội việc làm mới.
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
                  <CircleIcon sx={{ fontSize: "6px" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    Những bạn đã có hiểu biết cơ bản về Cloud & AWS nhưng muốn
                    tìm hiểu kỹ hơn về thiết kế hệ thống.
                  </Typography>
                </Box>
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
                  I have been working with Cloud (main AWS) since 2015 and 5
                  year working and living in Japan.
                  <br /> Language: Japanese (Business Intermediate level),
                  English (Intermediate).
                  <br /> Certificates: AWS Certified Solution Architect
                  Professional (since 2018, re-new 2023).
                  <br /> Other: AWS Community Builder (since 2023).
                  <br /> As a Cloud Solution Architect (SA), I can provide
                  solutions for customer during system design, development and
                  deployment.
                  <br /> I also contribute to community by many activities like
                  Youtube channel, on-demand private training course and now on
                  Udemy. Nice to make friend with all of you.
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
                  491 xếp hạng
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                    <Comment ImageUser={ImageUser} />
                  </Grid>
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
