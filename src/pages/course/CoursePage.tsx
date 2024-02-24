import { useState } from 'react';

import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseNameInput from '@/features/course/course-name-input';
import FloatMenu from '@/features/map/float-menu';
import PathView from '@/features/path/path-view';
import SearchBar from '@/features/search/search-bar';
import SearchResultsContainer from '@/features/search/search-results-container';
import { useTmap } from '@/hooks/useTmap';
import { useGetCourseDetail } from '@/query-hooks/course/query';
import { SearchResultType } from '@/types/search';

import * as S from './CoursePage.css';

function CoursePage() {
    const { mapContainerRef } = useTmap();
    const { courseId } = useParams();

    const {
        data: { pinList = [] },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.wrapper}>
                <SidePanel>
                    <CourseNameInput />

                    <SearchBar
                        isSearchMode={isSearchMode}
                        setIsSearchMode={setIsSearchMode}
                        setSearchResults={setSearchResults}
                    />

                    <div
                        className={clsx(
                            S.pathViewWrapper,
                            isSearchMode && S.hidden,
                        )}
                    >
                        <PathView pinList={pinList} />
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

export default CoursePage;
