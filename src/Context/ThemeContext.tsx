import {createContext, useState} from 'react';

export type Theme = {
  theme: boolean;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<Theme>({
  theme: true,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(true);
  function toggleTheme() {
    setTheme(!theme);
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
