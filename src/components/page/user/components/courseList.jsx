import { Box, Container, Grid, Typography } from "@mui/material";
import Course from "./course";

function CourseList({ isNew, title, isPrice, isStuded }) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", mb: "24px", mt: "12px" }}>
        <Typography
          sx={{ color: "#242424", fontSize: "24px", fontWeight: "900" }}
        >
          {title}
        </Typography>
        {isNew && (
          <Box
            sx={{
              backgroundColor: "#1473e6",
              borderRadius: "4px",
              height: "max-content",
              padding: "3px 6px",
              position: "relative",
              right: "-8px",
              textTransform: "uppercase",
              top: "0",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: "500" }}
            >
              mới
            </Typography>
          </Box>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
          <Course isPrice={isPrice} isStuded={isStuded} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
          <Course isPrice={isPrice} isStuded={isStuded} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
          <Course isPrice={isPrice} isStuded={isStuded} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ minWidth: "320px" }}>
          <Course isPrice={isPrice} isStuded={isStuded} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CourseList;
