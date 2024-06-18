import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import {
  AppBar,
  Badge,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ImageUser from "../assets/images/662a66043215d.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ImageCustom from "./imageCustom";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function HeaderMobile({
  isLogin,
  setIsLogin,
  isInfoPage,
  currentUser,
}) {
  const [open, setOpen] = React.useState(false);
  const [toggleSearch, setToggleSearch] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        pt: "16px",
        pl: "16px",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {isLogin ? (
        <Box
          component={Link}
          to="/info"
          sx={{ pt: "16px", pl: "16px", textDecoration: "none" }}
        >
          <ImageCustom
            src={ImageUser}
            alt="account of current user"
            sx={{
              width: 80,
              height: 80,
              borderRadius: "99px",
              cursor: "pointer",
            }}
          />
          <Typography
            sx={{
              fontSize: "16px !important",
              fontWeight: "500 !important",
              color: "#292929",
              mt: "16px",
            }}
          >
            Nguyen Sinh Tien
          </Typography>
        </Box>
      ) : (
        <IconButton
          component={Link}
          to="/search"
          color="#000"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            borderRadius: "5px",
            width: "100%",
            height: "52px",
            padding: "16px 0 16px 16px",
            gap: "8px",
          }}
        >
          <LogoutIcon />
          <Typography
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              fontSize: "16px !important",
              fontWeight: "500 !important",
              color: "#292929",
            }}
          >
            Đăng Nhập
          </Typography>
        </IconButton>
      )}

      <Divider sx={{ m: "16px 0" }} />
      <IconButton
        component={Link}
        to="/"
        color="#1a1a1a"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          borderRadius: "5px",
          width: "100%",
          height: "52px",
          padding: "16px 0 16px 16px",
          gap: "8px",
          backgroundColor: "#e8ebed",
        }}
      >
        <HomeIcon />
        <Typography
          sx={{
            fontSize: "16px !important",
            fontWeight: "500 !important",
            color: "#292929",
          }}
        >
          Trang chủ
        </Typography>
      </IconButton>
      <IconButton
        component={Link}
        to="/search"
        color="#000"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          borderRadius: "5px",
          width: "100%",
          height: "52px",
          padding: "16px 0 16px 16px",
          gap: "8px",
        }}
      >
        <AssignmentIcon />
        <Typography
          sx={{
            fontSize: "16px !important",
            fontWeight: "500 !important",
            color: "#292929",
          }}
        >
          Lộ trình
        </Typography>
      </IconButton>
      <IconButton
        component={Link}
        to="/info"
        color="#000"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          borderRadius: "5px",
          width: "100%",
          height: "52px",
          padding: "16px 0 16px 16px",
          gap: "8px",
        }}
      >
        <PersonIcon />
        <Typography
          sx={{
            fontSize: "16px !important",
            fontWeight: "500 !important",
            color: "#292929",
          }}
        >
          Bài viết
        </Typography>
      </IconButton>
      <Divider sx={{ m: "16px 0" }} />
      {isLogin && (
        <IconButton
          component={Link}
          to="/search"
          color="#000"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            borderRadius: "5px",
            width: "100%",
            height: "52px",
            padding: "16px 0 16px 16px",
            gap: "8px",
          }}
        >
          <LogoutIcon />
          <Typography
            sx={{
              fontSize: "16px !important",
              fontWeight: "500 !important",
              color: "#292929",
            }}
          >
            Đăng xuất
          </Typography>
        </IconButton>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "10",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: isInfoPage
            ? isScrolled
              ? "#fff"
              : "transparent"
            : "#fff",
          boxShadow: "none",
          borderBottom: isInfoPage
            ? isScrolled
              ? "1px solid #e8ebed"
              : "none"
            : "1px solid #e8ebed",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            color="#707070"
          >
            <MenuIcon />
          </IconButton>
          {toggleSearch ? (
            <>
              <Button
                component={Link}
                to="/"
                onClick={handleToggleSearch}
                sx={{ color: "#808990" }}
              >
                <KeyboardArrowLeftIcon /> Quay lại
              </Button>
              <Box sx={{ flexGrow: 1 }}></Box>
            </>
          ) : (
            <>
              {isInfoPage ? (
                <>
                  <Button component={Link} to="/" sx={{ color: "#808990" }}>
                    <KeyboardArrowLeftIcon /> Quay lại
                  </Button>
                  <Box sx={{ flexGrow: 1 }}></Box>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <IconButton
                    component={Link}
                    to="/search"
                    size="large"
                    aria-label="show 17 new notifications"
                    color="#707070"
                    onClick={handleToggleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </>
              )}
            </>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLogin ? (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="#707070"
              >
                <Badge badgeContent={17} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            ) : (
              <Box
                component={Link}
                to="/register"
                sx={{
                  textDecoration: "none",
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  borderRadius: "99px",
                  color: "#fff",
                  cursor: "pointer",
                  ml: "12px",
                  padding: "9px 20px",
                  transition: "opacity .25s",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px !important", fontWeight: "500" }}
                >
                  Đăng ký
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
