import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ImageCustom from "./imageCustom";
import NearMeIcon from "@mui/icons-material/NearMe";

import logoImage from "../assets/images/f8-icon.18cd71cfcfa33566a22b.png";
import ImageUser from "../assets/images/662a66043215d.jpg";
import { Button, useScrollTrigger } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Search = styled("div")(({ theme, isFocused }) => ({
  position: "relative",
  color: "#707070",
  fontSize: "14px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "420px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  borderRadius: "20px",
  border: isFocused ? "2px solid #444" : "2px solid #e8e8e8",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "420px",
    },
  },
}));

export default function HeaderLaptop({
  isLogin,
  setIsLogin,
  isInfoPage,
  currentUser,
}) {
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = React.useState(false);
  const [isValue, setIsValue] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?course-name=${searchValue}`);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
  };

  const handleClickSearch = () => {
    console.log("click");
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", sm: "flex" },
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "9999",
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
          height: "66px",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={Link} to="/" sx={{ height: "38px", mr: "24px" }}>
              <ImageCustom
                src={logoImage}
                alt="avatar"
                sx={{
                  // width: ,
                  height: 38,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            </Box>

            {isInfoPage ? (
              <Button
                size="small"
                component={Link}
                to="/"
                sx={{ color: "#808990", fontSize: "14px" }}
              >
                <KeyboardArrowLeftIcon /> Quay lại
              </Button>
            ) : (
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Học Lập Trình Để Đi Làm
              </Typography>
            )}
          </Box>
          {!isInfoPage && (
            <Search isFocused={isFocused}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                value={searchValue}
                placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                inputProps={{ "aria-label": "search" }}
              />
              {isValue && (
                <IconButton
                  onClick={handleClickSearch}
                  component={Link}
                  to={`/search?course-name=${searchValue}`}
                  sx={{
                    cursor: "pointer",
                    p: "6px",
                    position: "absolute",
                    top: "1px",
                    right: "2px",
                    color: "#000",
                  }}
                >
                  <NearMeIcon />
                </IconButton>
              )}
            </Search>
          )}

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isLogin ? (
              <>
                {!isInfoPage && (
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Khóa học của tôi
                  </Typography>
                )}

                {/* <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="#707070"
                >
                  <Badge badgeContent={17} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton> */}
                {/* avatar khi dang nhap */}
                <Box component={Link} to="/info">
                  <ImageCustom
                    src={currentUser?.avatar ? currentUser.avatar : ImageUser}
                    alt="account of current user"
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "99px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Đăng nhập
                </Typography>
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
                    ml: "32px",
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
