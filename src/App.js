import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import './App.css';
import Routers from './components/Routers/Routers';

import Login from './components/page/Login';
import Signup from './components/page/Signup';

function App() {
  const theme = useTheme();
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: 'flex',
      // justifyContent: 'center'
    }}>
      <Routers />
    </Box>
  );
}

export default App;
