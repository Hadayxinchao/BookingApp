import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Redirect } from 'react-router-dom';
import SigninForm  from "./components/forms/SigninForm";
import TopBar from "./scenes/global/TopBar";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/dashboard" element={<SigninForm />} />
            </Routes>
            <main className="content">
              <TopBar />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
