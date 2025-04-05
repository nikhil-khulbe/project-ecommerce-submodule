import {createContext, useState} from 'react';
type LanguageOption = 'english' | 'spanish';
export type Language = {
  language: LanguageOption;
  changeLanguage: (lang:LanguageOption) => void;
}


export const LangaugeContext = createContext<Language>({
  language: 'english',
  changeLanguage:()=>{},
});



export const LangaugeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setlanguage] = useState<LanguageOption>('english');
  const changeLanguage = (lang:'english'|'spanish') => {
    setlanguage(lang)
  }
  return (
    <LangaugeContext.Provider value={{language, changeLanguage}}>
      {children}
    </LangaugeContext.Provider> 
  )
};
