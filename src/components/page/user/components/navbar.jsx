import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../../App";
import { removeStorageTokenUser, removeStorageUser } from "../../../../util/localStorage";
import SchoolIcon from '@mui/icons-material/School';

function Navbar({ isLogin, setIsLogin, positionFix }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [navActive, setNavActive] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();


  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleMouseEnter = () => {
    setShowNavbar(true);
  };

  const handleMouseLeave = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    const value = location.pathname;
    setNavActive(value);
  }, [location.pathname]);

  const handleLogout = () => {
    console.log('logout')
    setIsLogin(false)
    setCurrentUser({});
    removeStorageUser();
    removeStorageTokenUser();
    navigate("/");
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: positionFix ? "fixed" : "relative",
        top: positionFix ? "66px" : "0px",
        left: "0px",
        display: { xs: "none", md: "block" },
        zIndex: positionFix ? 20 : 0,
        width: "50px",
        height: "360px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, .3)",
          borderBottomRightRadius: "10px",
          borderTopRightRadius: "10px",
          bottom: 0,
          display: positionFix ? "block" : "none",
          height: "100%",
          position: "absolute",
          left: "0",
          transform: showNavbar ? "translateX(-96px)" : "translateX(0)",
          transition: "transform .5s ease, opacity .5s ease",
          width: "5px",
        }}
      ></Box>
      <Box
        sx={{
          mt: "16px",
          width: "96px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          transform: positionFix
            ? showNavbar
              ? "translateX(0)"
              : "translateX(-96px)"
            : "translateX(0)",
          transition: "transform .5s ease, -webkit-transform .5s ease",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Box
          sx={{
            width: "44px",
            height: "44px",
            borderRadius: "99px",
            backgroundColor: "#1473e6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          color="#fff"
        >
          {/* <AddIcon /> */}
        </Box>
        <IconButton
          component={Link}
          to="/"
          color="#1a1a1a"
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            width: "72px",
            height: "72px",
            backgroundColor: navActive === "/" ? "#e8ebed" : "#fff",
          }}
        >
          <HomeIcon />
          <Typography
            sx={{ fontSize: "12px", fontWeigth: "700", color: "#000" }}
          >
            Trang chủ
          </Typography>
        </IconButton>
        {
          isLogin &&
          <IconButton
            component={Link}
            to="/storage"
            color="#000"
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              width: "72px",
              height: "72px",
              backgroundColor: navActive === "/storage" ? "#e8ebed" : "#fff",
            }}
          >
            <AssignmentIcon />
            <Typography
              sx={{ fontSize: "12px", fontWeigth: "700", color: "#000" }}
            >
              Lộ trình
            </Typography>
          </IconButton>
        }
        {
          isLogin && (
            <IconButton
              component={Link}
              to="/search"
              color="#000"
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                width: "72px",
                height: "72px",
                backgroundColor: navActive === "/search" ? "#e8ebed" : "#fff",
              }}
            >
              <SchoolIcon />
              <Typography
                sx={{ fontSize: "12px", fontWeigth: "700", color: "#000" }}
              >
                Khóa học
              </Typography>
            </IconButton>
          )
        }
        {
          isLogin && (
            <IconButton
              component={Link}
              to="/info"
              color="#000"
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                width: "72px",
                height: "72px",
                backgroundColor: navActive === "/info" ? "#e8ebed" : "#fff",
              }}
            >
              <PersonIcon />
              <Typography
                sx={{ fontSize: "12px", fontWeigth: "700", color: "#000" }}
              >
                Thông tin
              </Typography>
            </IconButton>
          )
        }
        {isLogin && (
          <IconButton
            onClick={handleLogout}
            color="#000"
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              width: "72px",
              height: "72px",
              backgroundColor: "#fff",
            }}
          >
            <LogoutIcon />
            <Typography
              sx={{ fontSize: "12px", fontWeigth: "700", color: "#000" }}
            >
              Đăng xuất
            </Typography>
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
