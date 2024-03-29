import { useContext, useRef } from 'react';

import { SearchContextValue } from '@/features/search/search-context';
import SearchResultTab from '@/features/search/search-result-tab';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useGetSearchPois } from '@/query-hooks/search/query';

import * as S from './SearchResultsContainer.css';

const SearchResultsContainer = () => {
    const { isSearchMode, searchKeyword } = useContext(SearchContextValue);
    const {
        data: searchResults = [],
        hasNextPage,
        fetchNextPage,
    } = useGetSearchPois({ keyword: searchKeyword });

    const rootRef = useRef<HTMLDivElement>(null);
    const handleIntersectBottom: IntersectionObserverCallback = (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        if (isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    };

    const { targetRef } = useIntersectionObserver<HTMLDivElement>({
        root: rootRef.current,
        onIntersect: handleIntersectBottom,
    });

    const isEmptySearchResults = !searchKeyword || !searchResults.length;

    if (!isSearchMode) return null;

    return (
        <div className={S.layout} ref={rootRef}>
            {isEmptySearchResults ? (
                <p className={S.emptyNotice}>검색결과가 없습니다.</p>
            ) : (
                searchResults.map(
                    ({ pkey, name, newAddressList, noorLat, noorLon }) => (
                        <SearchResultTab
                            key={pkey}
                            pKey={pkey}
                            name={name}
                            address={
                                newAddressList.newAddress[0].fullAddressRoad
                            }
                            latitude={noorLat}
                            longitude={noorLon}
                        />
                    ),
                )
            )}
            <div className={S.observer} ref={targetRef} />
        </div>
    );
};

export default SearchResultsContainer;
