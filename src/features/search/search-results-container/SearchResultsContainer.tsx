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
                const { pKey, name, newAddressList } = result;

                return (
                    <SearchResultTab
                        key={pKey}
                        name={name}
                        address={newAddressList.newAddress[0].fullAddressRoad}
                        isPinned={false}
                    />
                );
            })}
        </div>
    );
};

export default SearchResultsContainer;
