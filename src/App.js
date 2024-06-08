import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import './App.css';

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginEducator } from './api/auth';
import UserApp from './components/page/user/UserApp';
import useToken from './hook/token';
import CourseProvider from './provider/CourseProvider';
import { setStorageUser } from './util/localStorage';
import IndexProvider from './provider/IndexProvider';
import useCurrentUser from './hook/useCurrentUser';
import Routers from './components/Routers/Routers';

export const CurrentUserContext = createContext({});

function App() {
  // state
  // const [currentUser, setCurrentUser] = useState({});

  const {currentUser, setCurrentUser} = useCurrentUser();
  // custom hook
  const { token, setToken } = useToken();


  const theme = useTheme();


  // điều hướng page
  const navigate = useNavigate();

  useEffect(() => {
    // cap nhat sotre 
    if (!isObjEmpty(currentUser)) {
      setStorageUser(currentUser);
    }
    // neu co token thi dang nhap bang token
    if (token && isObjEmpty(currentUser)) {
      loginEducator()
        .then(response => {
          if (response != null && response.status == 200) {
            setCurrentUser(response.data.data.user);
          } else {
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
      <IndexProvider>
        <Box sx={{
          width: "100%",
          height: "100%",
          display: 'flex',
        }}>
          <UserApp />
          <Routers/>
        </Box>
      </IndexProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
