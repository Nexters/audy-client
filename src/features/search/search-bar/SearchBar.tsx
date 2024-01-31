import SearchIcon from '@/assets/icons/search.svg?react';

import * as S from './SearchBar.css';

const SearchBar = () => {
    return (
        <div className={S.searchBox}>
            <div className={S.searchInner}>
                <SearchIcon width={20} height={20} />
                <input
                    className={S.searchInput}
                    placeholder="장소를 입력해주세요."
                />
            </div>
        </div>
    );
};

export default SearchBar;
