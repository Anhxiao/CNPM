import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        try {

            const storedUser = localStorage.getItem("user");

            const accessToken = localStorage.getItem("accessToken");

            if (storedUser && accessToken) {

                setUser(JSON.parse(storedUser));

            }

        }

        catch (error) {

            console.error("Lỗi đọc dữ liệu đăng nhập:", error);

            localStorage.removeItem("user");

            localStorage.removeItem("accessToken");

            localStorage.removeItem("refreshToken");

        }

        finally {

            setLoading(false);

        }

    }, []);

    /**
     * Đăng nhập
     */
    const login = (

        userData,

        accessToken,

        refreshToken = ""

    ) => {

        if (!userData || !accessToken) {

            return;

        }

        localStorage.setItem(

            "user",

            JSON.stringify(userData)

        );

        localStorage.setItem(

            "accessToken",

            accessToken

        );

        if (refreshToken) {

            localStorage.setItem(

                "refreshToken",

                refreshToken

            );

        }

        setUser(userData);

    };

    /**
     * Đăng xuất
     */
    const logout = () => {

        localStorage.clear();

        setUser(null);

    };

    const value = useMemo(() => ({

        user,

        setUser,

        loading,

        login,

        logout,

        isAuthenticated: Boolean(user)

    }), [

        user,

        loading

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};

export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(

            "useAuthContext phải được dùng bên trong AuthProvider."

        );

    }

    return context;

};

export default AuthContext;