import { SearchResultsType } from '@/types/search';

import SearchResultTab from '../search-result-tab/SearchResultTab';

import * as S from './SearchResultsContainer.css';

interface PropsType {
    searchResults: SearchResultsType;
}

const SearchResultsContainer = ({ searchResults }: PropsType) => {
    return (
        <div className={S.layout}>
            {searchResults.map((result) => {
                const { pKey, name, newAddressList, noorLat, noorLon } = result;

                return (
                    <SearchResultTab
                        key={pKey}
                        id={pKey}
                        name={name}
                        address={newAddressList.newAddress[0].fullAddressRoad}
                        lat={noorLat}
                        lng={noorLon}
                    />
                );
            })}
        </div>
    );
};

export default SearchResultsContainer;
