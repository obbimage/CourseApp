import CourseProvider from "./CourseProvider"
import SearchProvider from "./SearchProvider"

export default function IndexProvider({ children }) {

    return (
        <>
            <CourseProvider>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </CourseProvider>
        </>
    )
}