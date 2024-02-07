import { useState } from 'react';

import clsx from 'clsx';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import FloatMenu from '@/features/map/float-menu';
import SearchBar from '@/features/search/search-bar';
import SearchResultsContainer from '@/features/search/search-results-container';
import { useTmap } from '@/hooks/useTmap';
import { SearchResultType } from '@/types/search';

import * as S from './MainPage.css';

function MainPage() {
    const { mapContainerRef } = useTmap();

    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.wrapper}>
                <SidePanel>
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
                        className={clsx(
                            S.courseViewWrapper,
                            isSearchMode && S.hidden,
                        )}
                    >
                        <CourseView />
                    </div>

                    {isSearchMode && (
                        <SearchResultsContainer searchResults={searchResults} />
                    )}
                </SidePanel>
                <div className={S.map} ref={mapContainerRef}>
                    <FloatMenu />
                </div>
            </div>
        </>
    );
}

export default MainPage;
