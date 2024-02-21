import { useState } from 'react';

import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
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
        data: { courseName, pinList = [] },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

    const [isCourseNameEditing, setIsCourseNameEditing] = useState(false);
    const [editedCourseName, setEditedCourseName] = useState(courseName);

    const handleCourseNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) =>
        setEditedCourseName(target.value);

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
                                    value={editedCourseName}
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
                                <p className={S.courseName}>
                                    {editedCourseName}
                                </p>
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
