import { Route, Routes } from "react-router-dom";

import Login from "../page/Login";
import Signup from "../page/Signup";
import Educator from "../page/educator/Educator";
import EducatorProfile from "../page/educator/EducatorProfile";
import { Router } from "@mui/icons-material";
import EducatorCourse from "../page/educator/EducatorCourse";
export default function Routers() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/educator" element={<Educator />}>
        <Route path="profile" element={<EducatorProfile />} />
        <Route path='course' element={<EducatorCourse/>}/>
      </Route>
    </Routes>
  )
}