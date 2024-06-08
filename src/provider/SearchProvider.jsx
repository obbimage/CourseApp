import { createContext, useState } from "react"

export const SearchContext = createContext(null);

export default function SearchProvider({ children }) {
    const [search, setSearch] = useState("");

    return (
        <SearchContext.Provider value={{ search, setSearch }} >

            {children}
        </SearchContext.Provider>
    )
}