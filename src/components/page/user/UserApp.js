import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeaderLaptop from "./components/headerLaptop";
import HeaderMobile from "./components/headerMobile";
import { Box, Grid } from "@mui/material";
import Home from "./components/home";
import Search from "./components/search";
import Info from "./components/info";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import CourseItem from "./components/courseItem";
import Test from "./components/test";
import CourseLearn from "./components/courseLearn";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function HeadFooterNav({
  children,
  isLogin,
  setIsLogin,
  isInfoPage,
  positionFix,
  currentUser
})
 {

  return (
    <>
      <HeaderLaptop
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isInfoPage={isInfoPage}
        currentUser={currentUser}
        
      />
      <HeaderMobile
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isInfoPage={isInfoPage}
        currentUser={currentUser}
      />
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "center",
          mt: {
            xs: isInfoPage ? "0px" : "66px",
            sm: isInfoPage ? "0px" : "66px",
          },
        }}
      >
        <Grid item xs={0} md={1}>
          <Navbar
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            positionFix={positionFix}
          />
        </Grid>
        <Grid item xs={11}>
          {children}
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

function HeadFooter({
  children,
  isLogin,
  setIsLogin,
  isInfoPage,
  positionFix,
  showNavbar,
}) {
  return (
    <Box sx={{
      width:'100%',
      display:'flex',
      flexDirection:'column'
    }}>
      <HeaderLaptop
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isInfoPage={isInfoPage}
      />
      <HeaderMobile
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isInfoPage={isInfoPage}
      />
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "center",
          mt: {
            xs: isInfoPage ? "0px" : "66px",
            sm: isInfoPage ? "0px" : "66px",
          },
        }}
      >
        <Grid item xs={12}>
          {showNavbar && (
            <Navbar
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              positionFix={positionFix}
            />
          )}

          {children}
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
}

function AppContext() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [positionFix, setPositionFix] = React.useState(false);
  const [isInfoPage, setIsInfoPage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const location = useLocation();


  React.useEffect(() => {
    if (location.pathname === "/info") {
      setIsInfoPage(true);
      setPositionFix(true);
    } else {
      setIsInfoPage(false);
      setPositionFix(false);
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route
        path="/"
        element={
          <HeadFooterNav
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            isInfoPage={isInfoPage}
            positionFix={positionFix}
            currentUser={currentUser}
          >
            <Home />
          </HeadFooterNav>
        }
      />
      <Route
        path="/search"
        element={
          <HeadFooterNav
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            isInfoPage={isInfoPage}
            positionFix={positionFix}
            currentUser={currentUser}
          >
            <Search />
          </HeadFooterNav>
        }
      />
      <Route
        path="/info"
        element={
          <HeadFooter
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            isInfoPage={isInfoPage}
            positionFix={positionFix}
            showNavbar={true}
            currentUser={currentUser}
          >
            <Info setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </HeadFooter>
        }
      />
      <Route
        path="/course/1"
        element={
          <HeadFooter
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            isInfoPage={isInfoPage}
            positionFix={positionFix}
            showNavbar={false}
            currentUser={currentUser}
          >
            <CourseItem />
          </HeadFooter>
        }
      />
      <Route
        path="/course/:courseId/learn"
        element={
          <HeadFooter
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            isInfoPage={isInfoPage}
            positionFix={positionFix}
            showNavbar={false}
            currentUser={currentUser}
          >
            <CourseLearn />
          </HeadFooter>
        }
      />
      <Route
        path="/login"
        element={<Login isLogin={isLogin} setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} />}
      />
      <Route
        path="/register"
        element={<Register isLogin={isLogin} setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} />}
      />
    </Routes>
  );
}

export default function UserApp() {
  return (
    // <BrowserRouter>
      <AppContext />
    // </BrowserRouter>
  );
}
