import { useContext, useState } from 'react';

import SearchIcon from '@/assets/icons/search.svg?react';
import XCircle from '@/assets/icons/xCircle.svg?react';
import {
    SearchContextAction,
    SearchContextValue,
} from '@/features/search/search-context';

import * as S from './SearchBar.css';

const SearchBar = () => {
    const [searchInputValue, setSearchInputValue] = useState('');

    const { setIsSearchMode, setSearchKeyword } =
        useContext(SearchContextAction);
    const { isSearchMode } = useContext(SearchContextValue);

    const handleSearchInput = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(target.value);
    };

    const handleSearchInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            setSearchKeyword(searchInputValue);
        }
    };

    const handleInitializeInput = () => {
        setSearchInputValue('');
        setSearchKeyword('');
    };

    const handleCancelSearch = () => {
        setSearchInputValue('');
        setSearchKeyword('');
        setIsSearchMode(false);
    };

    const handleSearchInputFocus = () => {
        if (!isSearchMode) setIsSearchMode(true);
    };

    const handleSearchInputBlur = () => {
        if (!searchInputValue) setIsSearchMode(false);
    };

    return (
        <div className={S.searchBox}>
            <div className={S.searchInnerBox}>
                <SearchIcon width={20} height={20} />

                <input
                    className={S.searchInput({ isSearchMode })}
                    placeholder="찾고 싶은 장소를 검색해보세요."
                    onKeyDown={handleSearchInputKeyDown}
                    value={searchInputValue}
                    onChange={handleSearchInput}
                    onFocus={handleSearchInputFocus}
                    onBlur={handleSearchInputBlur}
                />

                {searchInputValue && (
                    <div className={S.cancelContainer}>
                        <button
                            className={S.initializeButton}
                            onClick={handleInitializeInput}
                        >
                            <XCircle fill="rgba(0, 0, 0, 0.2)" />
                        </button>

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
                )}
            </div>
        </div>
    );
};

export default SearchBar;
