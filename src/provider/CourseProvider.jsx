import { createContext, useState } from "react";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {
    const [courseProvider, setCourseProvider] = useState({});
    return (
        <CourseContext.Provider
            value={{
                courseProvider,
                setCourseProvider
            }}>
            {children}
        </CourseContext.Provider>
    );
}