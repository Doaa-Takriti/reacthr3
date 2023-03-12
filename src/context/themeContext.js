import  React  from  "react";
// Context has been created
const  ThemeContext  =  React.createContext();
// Provider
const  ThemeProvider  =  ({ children })  =>  {
    const  [toggleNavbar, setToggleNavbar]  =  React.useState(false);
    const  [darkMode1, setdarkMode1]  =  React.useState(false);
    console.log(darkMode1)
 


    const toggleFunction =  ()  =>  {
    setToggleNavbar(!toggleNavbar);
    console.log(toggleNavbar)
};
const toggleMode =  ()  =>  {
    setdarkMode1(!darkMode1);
    console.log(darkMode1)

};
return  (
    <ThemeContext.Provider value={{ toggleNavbar, toggleFunction,darkMode1, toggleMode}}>
        {children}
    </ThemeContext.Provider>
    );
};
export  {  ThemeContext,  ThemeProvider  };