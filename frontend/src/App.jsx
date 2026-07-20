import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import "./assets/styles/global.css";
import "./assets/styles/layout.css";
import "./assets/styles/responsive.css";

function App() {

    return (

        <ThemeProvider>

            <AuthProvider>

                <NotificationProvider>

                    <AppRoutes />

                </NotificationProvider>

            </AuthProvider>

        </ThemeProvider>

    );

}

export default App;