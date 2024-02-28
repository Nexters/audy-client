import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseNameInput from '@/features/course/course-name-input';
import FloatMenu from '@/features/map/float-menu';
import PathView from '@/features/path/path-view';
import SearchBar from '@/features/search/search-bar';
import { SearchContextProvider } from '@/features/search/search-context';
import SearchResultsContainer from '@/features/search/search-results-container';
import { useTmap } from '@/hooks/useTmap';

import * as S from './CoursePage.css';

function CoursePage() {
    const { mapContainerRef } = useTmap();

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.wrapper}>
                <SidePanel>
                    <CourseNameInput />
                    <SearchContextProvider>
                        <SearchBar />
                        <PathView />
                        <SearchResultsContainer />
                    </SearchContextProvider>
                </SidePanel>

                <div className={S.map} ref={mapContainerRef}>
                    <FloatMenu />
                </div>
            </div>
        </>
    );
}

export default CoursePage;
