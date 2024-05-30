import { Box, Container, Typography } from "@mui/material";
import Carousel from "./carousel2";
import CourseList from "./courseList";

function Home() {
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
          title={"Khóa học Pro"}
          isPrice={true}
          isStuded={false}
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
          title={"Khóa học miễn phí"}
          isPrice={false}
          isStuded={true}
        />
      </Box>
    </Box>
  );
}

export default Home;
