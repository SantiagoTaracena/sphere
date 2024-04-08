import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {
    const authentication = Boolean(useSelector((state) => state.token));    
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route
                            path="/home"
                            element={authentication ? <HomePage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/profile/:userId"
                            element={authentication ? <ProfilePage /> : <Navigate to="/" />}
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;