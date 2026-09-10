import { createContext, useState, useContext } from "react";


const ThemeContext = createContext();


function ThemeProvider({children})  {
  const [theme, setTheme] = useState(()=>{
    const saved = localStorage.getItem("theme")
      return saved || "light" 
  }
  );

  function toggleTheme() {
    if(theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }
  return(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext);
  if(!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };