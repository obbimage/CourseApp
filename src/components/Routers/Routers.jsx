import { Route, Routes } from "react-router-dom";

import Login from "../page/Login";
import Signup from "../page/Signup";
import Educator from "../page/educator/Educator";
import EducatorProfile from "../page/educator/EducatorProfile";
import { Router } from "@mui/icons-material";
import EducatorCourse from "../page/educator/EducatorCourse";
import CreateCourse from "../page/educator/CreateCourse";
import EditCourse from "../page/educator/EditCourse";
export default function Routers() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/educator/course/create" element={<CreateCourse/>}/>
      <Route path="/educator/course/edit" element={<EditCourse/>}/>
      <Route path="/educator" element={<Educator />}>
        <Route path="profile" element={<EducatorProfile />} />
        <Route path='course' element={<EducatorCourse/>}/>
      </Route>
    </Routes>
  )
}