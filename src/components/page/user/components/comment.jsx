import { Avatar, Box, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Comment({ ImageUser, rate }) {
  const [rateState, setRateState] = useState({});
  const [userState, setUserState] = useState({});

  useEffect(() => {
    if (rate) {
      setRateState(rate);
    }
  }, [rate]);

  useEffect(() => {
    let user = rateState.user;
    setUserState(user);
  }, [rateState]);
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
          src={userState?.avatar || ImageUser}
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
            {`${userState?.lastName} ${userState?.firstName}`}
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
        {rateState?.comment}
      </Typography>
    </Box>
  );
}

export default Comment;
