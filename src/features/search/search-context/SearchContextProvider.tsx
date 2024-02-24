import {
    type PropsWithChildren,
    createContext,
    useMemo,
    useState,
} from 'react';

interface SearchContextValueType {
    isSearchMode: boolean;
    searchKeyword: string;
}

interface SearchContextActionType {
    setIsSearchMode: (isSearchMode: boolean) => void;
    setSearchKeyword: (searchKeyword: string) => void;
}

export const SearchContextValue = createContext<SearchContextValueType>(
    {} as SearchContextValueType,
);

export const SearchContextAction = createContext<SearchContextActionType>(
    {} as SearchContextActionType,
);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const value = useMemo(
        () => ({ isSearchMode, searchKeyword }),
        [isSearchMode, searchKeyword],
    );
    const action = useMemo(() => ({ setIsSearchMode, setSearchKeyword }), []);

    return (
        <SearchContextValue.Provider value={value}>
            <SearchContextAction.Provider value={action}>
                {children}
            </SearchContextAction.Provider>
        </SearchContextValue.Provider>
    );
};
