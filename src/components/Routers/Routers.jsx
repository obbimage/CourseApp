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

export default function Routers() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { token, setToken } = useToken();
  const location = useLocation();
  const [preLocation, setPreLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // nêu không đăng nhập và truy cập các trang trước đó
    if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
      setPreLocation(location.pathname) // luu tru trang truoc do
      navigate('/login');
    }
  }, [token, navigate, location]);

  const handleLoginSuccess = () => {
    console.log('login success')
    if (preLocation) {
      navigate(preLocation);
    } else {
      navigate("/");
    }
  }

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login onLoginSuccess={handleLoginSuccess} />} />
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
      </Route>
      <Route path="/educator" element={<Educator />}>
        <Route path="profile" element={<EducatorProfile />} />
        <Route path='course' element={<EducatorCourse />}>
        </Route>
      </Route>
    </Routes>
  )
}