import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LoginForm  from "./components/loginForm/LoginForm";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <div>
      <LoginForm />

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content"></main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
