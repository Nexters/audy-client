import { useState } from 'react';

import { TmapRepository } from '@/apis/tmap';
import SearchIcon from '@/assets/icons/search.svg?react';
import { SearchResultsType } from '@/types/search';

import * as S from './SearchBar.css';

interface PropsType {
    setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResultsType>>;
}

const SearchBar = ({ setIsSearchMode, setSearchResults }: PropsType) => {
    const [searchInputValue, setSearchInputValue] = useState('');

    const handleSearch = async () => {
        const response = await TmapRepository.getPoiSearch({
            keyword: searchInputValue,
        });

        setSearchResults(response);
    };

    const handleSearchInput = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsSearchMode(true);
            handleSearch();
        }
    };

    return (
        <div className={S.searchBox}>
            <div className={S.searchInner}>
                <SearchIcon width={20} height={20} />
                <input
                    className={S.searchInput}
                    placeholder="장소를 입력해주세요."
                    onKeyDown={handleKeyDown}
                    value={searchInputValue}
                    onChange={handleSearchInput}
                />
            </div>
        </div>
    );
};

export default SearchBar;
