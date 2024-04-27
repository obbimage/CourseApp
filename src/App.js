import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import './App.css';
import Routers from './components/Routers/Routers';

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './components/page/Login';
import useToken from './hook/token';
import { loginEducator } from './api/auth';
import CourseProvider from './provider/CourseProvider';

export const CurrentUserContext = createContext({});

function App() {
  // state
  const [currentUser, setCurrentUser] = useState({});

  // custom hook
  const { token, setToken } = useToken();


  const theme = useTheme();

  // điều hướng page
  const navigate = useNavigate();

  useEffect(() => {
    // neu co token thi dang nhap bang token
    if (token && isObjEmpty(currentUser)) {
      loginEducator()
        .then(response => {
          if (response != null && response.status == 200) {
            setCurrentUser(response.data.data.user);
          }else{
            setToken("");
          }
        })
    }
  }, [token, currentUser]);

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      <CourseProvider>
        <Box sx={{
          width: "100%",
          height: "100%",
          display: 'flex',
          // justifyContent: 'center'
        }}>
          {/* {isObjEmpty(currentUser) ? <Login /> : <Routers />} */}
          <Routers/>
        </Box>
      </CourseProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
