import { useState } from 'react';

import { TmapRepository } from '@/apis/tmap';
import SearchIcon from '@/assets/icons/search.svg?react';
import XCircle from '@/assets/icons/xCircle.svg?react';
import { SearchResultType } from '@/types/search';

import * as S from './SearchBar.css';

interface PropsType {
    isSearchMode: boolean;
    setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResultType[]>>;
}

const SearchBar = ({
    isSearchMode,
    setIsSearchMode,
    setSearchResults,
}: PropsType) => {
    const [searchInputValue, setSearchInputValue] = useState('');

    const handleSearch = async () => {
        const response = await TmapRepository.getPoiSearchAsync({
            keyword: searchInputValue,
        });

        setSearchResults(response);
    };

    const handleSearchInput = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(target.value);
    };

    const handleSearchInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') handleSearch();
    };

    const handleInitializeInput = () => setSearchInputValue('');

    const handleCancelSearch = () => {
        setSearchInputValue('');
        setIsSearchMode(false);
        setSearchResults([]);
    };

    const handleSearchInputFocus = () => {
        if (!isSearchMode) setIsSearchMode(true);
    };

    return (
        <div className={S.searchBox}>
            <div className={S.searchInnerBox}>
                <SearchIcon width={20} height={20} />

                <input
                    className={S.searchInput}
                    placeholder="장소를 입력해주세요."
                    onKeyDown={handleSearchInputKeyDown}
                    value={searchInputValue}
                    onChange={handleSearchInput}
                    onFocus={handleSearchInputFocus}
                />

                <div className={S.cancelContainer}>
                    {searchInputValue && (
                        <button
                            className={S.initializeButton}
                            onClick={handleInitializeInput}
                        >
                            <XCircle fill="rgba(0, 0, 0, 0.2)" />
                        </button>
                    )}

                    {isSearchMode && (
                        <>
                            <div className={S.divider}></div>
                            <button
                                className={S.cancelButton}
                                onClick={handleCancelSearch}
                            >
                                취소
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
