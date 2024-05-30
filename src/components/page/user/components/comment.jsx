import { Avatar, Box, Rating, Typography } from "@mui/material";

function Comment({ ImageUser }) {
  return (
    <Box sx={{ p: "24px 0", borderTop: "1px solid #d1d7dc" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          mb: "14px",
        }}
      >
        <Avatar
          alt="Nguyen Sinh Tien"
          src={ImageUser}
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography
            sx={{
              color: "#2d2f31",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Minh Q.
          </Typography>
          <Rating
            sx={{ fontSize: "16px" }}
            name="read-only"
            value={5}
            readOnly
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: "#2d2f31",
        }}
      >
        Mong có thêm khoá nâng cao hơn nữa, Học chỉ trông đến mấy bài labs để áp
        dụng và hiểu lý thuyết đã học.
      </Typography>
    </Box>
  );
}

export default Comment;
