import { useState } from 'react';

import clsx from 'clsx';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import CourseView from '@/features/course/course-view';
import SearchBar from '@/features/search/search-bar';
import SearchResultsContainer from '@/features/search/search-results-container';
import { SearchResultsType } from '@/types/search';

import * as S from './SidePanel.css';

const SidePanel = () => {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultsType>([]);

    return (
        <div className={S.sidePanel}>
            <div className={S.header}>
                <LeftArrowIcon
                    width={24}
                    height={24}
                    className={S.backArrowIcon}
                />
                <p className={S.courseName}>테스트 코스</p>
                <ModifyFilledIcon
                    width={24}
                    height={24}
                    className={S.modifyIcon}
                />
            </div>

            <SearchBar
                isSearchMode={isSearchMode}
                setIsSearchMode={setIsSearchMode}
                setSearchResults={setSearchResults}
            />

            <div
                className={clsx(S.courseViewWrapper, isSearchMode && S.hidden)}
            >
                <CourseView />
            </div>

            {isSearchMode && (
                <SearchResultsContainer searchResults={searchResults} />
            )}
        </div>
    );
};

export default SidePanel;