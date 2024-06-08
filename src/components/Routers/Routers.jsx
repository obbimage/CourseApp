import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import ChangePassword from "../page/ChangePassword";
import Login from "../page/Login";
import Signup from "../page/Signup";
import CreateCourse from "../page/educator/CreateCourse";
import EditCourse from "../page/educator/EditCourse";
import Educator from "../page/educator/Educator";
import EducatorCourse from "../page/educator/EducatorCourse";
import EducatorProfile from "../page/educator/EducatorProfile";
import Curriculum from "../page/educator/editCourses/Curriculum";
import FilmAdnEdit from "../page/educator/editCourses/FilmAndEdit";
import Intended from "../page/educator/editCourses/Intended";
import LadingPage from "../page/educator/editCourses/LandingPage";
import Pricing from "../page/educator/editCourses/Pricing";
import SetupStudio from "../page/educator/editCourses/SetupStudio";
import StructureCourse from "../page/educator/editCourses/StructureCourse";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../App";
import useToken from "../../hook/token";
import Setting from "../page/educator/editCourses/Setting";
import LoginAdmin from "../page/admin/LoginAdmin";
import SignUpAdmin from "../page/admin/SignupAdmin";
import AdminPage from "../page/admin/AdminPage";
import AdminProfile from "../page/admin/ProfileAdmin";
import Data from "../page/admin/Data";
import MangerCourse from "../page/admin/MangerCourse";
import DetailsCourse from "../page/admin/layout/DetailsCourse";
import Char from "../page/admin/Char";
import { StringLink } from "../../static/StringLink";

export default function Routers() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { token, setToken } = useToken();
  const location = useLocation();
  const [preLocation, setPreLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // nêu không đăng nhập và truy cập các trang trước đó
    // if (!token && location.pathname !== '/login/educator' && location.pathname !== '/signup' && location.pathname !== '/login/admin') {
    //   setPreLocation(location.pathname) // luu tru trang truoc do
    //   navigate(StringLink.loginEducator);
    // }
  }, [token, navigate, location]);

  const handleLoginSuccess = () => {
    console.log('login success')
    if (preLocation) {
      console.log(preLocation);
      navigate(preLocation);
    } else {
      navigate("/educator");
    }
  }

  return (
    <Routes>
      <Route path='/signup/educator' element={<Signup />} />
      <Route path='/login/educator' element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path='/changepassword' element={<ChangePassword />} />
      <Route path="/educator/course/create" element={<CreateCourse />} />
      <Route path="/educator/course/edit" element={<EditCourse />}>
        <Route index element={<Intended />} />
        <Route path="intended" element={<Intended />} />
        <Route path="structure" element={<StructureCourse />} />
        <Route path="setupStudio" element={<SetupStudio />} />
        <Route path="filmandedit" element={<FilmAdnEdit />} />
        <Route path="curriculum" element={<Curriculum />} />
        <Route path="landingPage" element={<LadingPage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="setting" element={<Setting />} />
      </Route>
      <Route path="/educator" element={<Educator />}>
        <Route path="profile" element={<EducatorProfile />} />
        <Route path='course' element={<EducatorCourse />}>
        </Route>
      </Route>
      <Route path="/login/admin" element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} />
      {/* <Route path="/signup/admin" element={<SignUpAdmin />} /> */}
      <Route path="admin" element={<AdminPage />}>
        <Route path="data" element={<Data />} />
        <Route path="course" element={<MangerCourse />} />
        <Route path="course/:courseId/review" element={<DetailsCourse />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="char" element={<Char />} />
      </Route>
    </Routes>
  )
}