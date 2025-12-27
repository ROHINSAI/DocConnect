import { useEffect, useState } from "react";
import { AdminThemeContext } from "./ThemeContextDef";

export const AdminThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('adminTheme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('adminTheme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        toggleTheme
    };

    return (
        <AdminThemeContext.Provider value={value}>
            {children}
        </AdminThemeContext.Provider>
    );
};
