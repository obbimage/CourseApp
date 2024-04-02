import { Route, Routes } from "react-router-dom";

import Login from "../page/Login";
import Signup from "../page/Signup";
import CreateCourse from "../page/educator/CreateCourse";
import EditCourse from "../page/educator/EditCourse";
import Educator from "../page/educator/Educator";
import EducatorCourse from "../page/educator/EducatorCourse";
import EducatorProfile from "../page/educator/EducatorProfile";
import Intended from "../page/educator/editCourses/Intended";
import StructureCourse from "../page/educator/editCourses/StructureCourse";
import SetupStudio from "../page/educator/editCourses/SetupStudio";
import FilmAdnEdit from "../page/educator/editCourses/FilmAndEdit";
import Curriculum from "../page/educator/editCourses/Curriculum";
import LadingPage from "../page/educator/editCourses/LandingPage";
import Pricing from "../page/educator/editCourses/Pricing";
export default function Routers() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/educator/course/create" element={<CreateCourse />} />
      <Route path="/educator/course/edit" element={<EditCourse />}>
        <Route index element={<Intended />} />
        <Route path="intended" element={<Intended />} />
        <Route path="structure" element={<StructureCourse />}/>
        <Route path="setupStudio" element={<SetupStudio/>}/>
        <Route path="filmandedit" element={<FilmAdnEdit/>}/>
        <Route path="curriculum" element={<Curriculum/>}/>
        <Route path="landingPage" element={<LadingPage/>}/>
        <Route path="pricing" element={<Pricing/>}/>
      </Route>
      <Route path="/educator" element={<Educator />}>
        <Route path="profile" element={<EducatorProfile />} />
        <Route path='course' element={<EducatorCourse />}>
        </Route>
      </Route>
    </Routes>
  )
}