import { SearchResultType } from '@/types/search';

import SearchResultTab from '../search-result-tab/SearchResultTab';

import * as S from './SearchResultsContainer.css';

interface PropsType {
    searchResults: SearchResultType[];
}

const SearchResultsContainer = ({ searchResults }: PropsType) => {
    return (
        <div className={S.layout}>
            {searchResults.map(
                ({ pkey, name, newAddressList, noorLat, noorLon }) => (
                    <SearchResultTab
                        key={pkey}
                        id={pkey}
                        name={name}
                        address={newAddressList.newAddress[0].fullAddressRoad}
                        lat={noorLat}
                        lng={noorLon}
                    />
                ),
            )}
        </div>
    );
};

export default SearchResultsContainer;
