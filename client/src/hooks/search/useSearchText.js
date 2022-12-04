import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce'; 

const useSearchText = () => {

    const [searchText, setSearchText] = useState('');
    const [searchTextDebounced] = useDebounce(searchText, 300);

    const onSearchTextChanged = useCallback(searchText => {

        setSearchText(searchText);

    }, []);

    return { searchTextDebounced, onSearchTextChanged };
}

export default useSearchText;