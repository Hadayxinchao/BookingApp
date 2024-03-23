import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import SigninForm  from "./components/forms/SigninForm";
import SignupForm  from "./components/forms/SignupForm";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
            <main className="content"></main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
