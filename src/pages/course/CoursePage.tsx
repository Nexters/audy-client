import { useState } from 'react';

import clsx from 'clsx';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import FloatMenu from '@/features/map/float-menu';
import PathView from '@/features/path/path-view';
import SearchBar from '@/features/search/search-bar';
import SearchResultsContainer from '@/features/search/search-results-container';
import { useTmap } from '@/hooks/useTmap';
import { SearchResultType } from '@/types/search';

import * as S from './CoursePage.css';

function CoursePage() {
    const { mapContainerRef } = useTmap();

    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

    const [isCourseNameEditing, setIsCourseNameEditing] = useState(false);
    const [courseName, setCourseName] = useState('테스트 코스');

    const handleCourseNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => setCourseName(target.value);

    const handleCourseNameSave = () => {
        setIsCourseNameEditing(false);
    };

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.wrapper}>
                <SidePanel>
                    <div className={S.header}>
                        {isCourseNameEditing || (
                            <LeftArrowIcon
                                width={24}
                                height={24}
                                className={S.backArrowIcon}
                            />
                        )}

                        {isCourseNameEditing ? (
                            <>
                                <input
                                    type="text"
                                    className={S.courseNameInput}
                                    autoFocus
                                    value={courseName}
                                    onChange={handleCourseNameChange}
                                />
                                <button
                                    className={S.courseNameSaveButton}
                                    onClick={handleCourseNameSave}
                                >
                                    저장
                                </button>
                            </>
                        ) : (
                            <>
                                <p className={S.courseName}>{courseName}</p>
                                <button
                                    className={S.courseNameEditButton}
                                    onClick={() => setIsCourseNameEditing(true)}
                                >
                                    <ModifyFilledIcon width={24} height={24} />
                                </button>
                            </>
                        )}
                    </div>

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
                        <PathView />
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
