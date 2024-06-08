import { Box, Container, Typography } from "@mui/material";
import Carousel from "./carousel2";
import CourseList from "./courseList";
import { useEffect, useState } from "react";
import { getAllCourseNew, getAllCourseToPage } from "../../../../api/course";
import { handleApiResponse } from "../../../../api/instance";

function Home() {

  const [pageNumber, setPageNumber] = useState(0);
  const [courseTops, setCourseTops] = useState(null);
  const [courseNews, setCoruseNews] = useState(null);
  const pageSize = 4;

  useEffect(()=>{

    getAllCourseToPage(pageNumber,pageSize)
    .then(response=>{
      handleApiResponse(response,
        (data)=>{
          let courses = data.content;
          if(courses){
            setCourseTops(courses);
          }
        }
      )
    });

    getAllCourseNew(pageNumber,pageSize)
    .then(response=>{
      handleApiResponse(response,
        (dataResponse)=>{
          let courses = dataResponse.content;
          if(courses){
            setCoruseNews(courses);
          }
        }
      )
    })
  },[]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          width: { sm: "96%", xs: "100%" },
          borderRadius: "16px",
          mt: "20px",
        }}
      >
        <Carousel />

        <Box sx={{ mb: "80px" }}></Box>

        <CourseList
          isNew={true}
          title={"Top Khóa học"}
          isPrice={true}
          isStuded={false}
          value={courseTops}
        />
        <Container
          maxWidth="xl"
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "start",
            gap: "8px",
            color: "#82919b",
          }}
        >
          <Typography sx={{ fontWeight: "500" }}>392.916+</Typography>
          <Typography>người khác đã học</Typography>
        </Container>
        <CourseList
          isNew={false}
          title={"Khóa học học mới"}
          isPrice={true}
          isStuded={true}
          value={courseNews}
        />
        <CourseList
          isNew={false}
          title={"Khóa học miễn phí"}
          isPrice={false}
          isStuded={true}
          value={courseNews}
        />
      </Box>
    </Box>
  );
}

export default Home;
