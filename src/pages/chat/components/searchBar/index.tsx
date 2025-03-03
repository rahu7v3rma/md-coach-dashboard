import { FunctionComponent, useState } from 'react';

import Search from 'src/assets/images/Search.png';

import { SearchBarIcon, SearchBarView, TextInput } from './styles';

type Props = {
    onSearch?: Function;
};

const SearchBar: FunctionComponent<Props> = ({ onSearch }: Props) => {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <SearchBarView>
            <SearchBarIcon alt="search" src={Search} />
            <TextInput
                placeholder={'Search'}
                name="groupname"
                value={searchText}
                onChange={(event) => {
                    setSearchText(event.target.value);
                    onSearch && onSearch(event.target.value);
                }}
            />
        </SearchBarView>
    );
};

export default SearchBar;
