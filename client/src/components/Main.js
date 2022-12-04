import { useEffect } from 'react';

import Box from '@mui/material/Box';

import Map from './Map';
import SearchBox from './SearchBox';
import Users from './Users'

import useMapView from '../hooks/users/useMapView';
import useUsers from '../hooks/users/useUsers';
import useSearchText from '../hooks/search/useSearchText';

const Main = () => {

    const { searchTextDebounced: searchText, onSearchTextChanged } = useSearchText('');
    const { users, usersloading, usersError } = useUsers({ filter: searchText });
    const { mapRef, mapView, selectUser, drawUsersOnMap } = useMapView();

    useEffect(() => {

        if (!mapView?.ready) return;

         drawUsersOnMap(users);

    }, [mapView, users, drawUsersOnMap]);

    return (<div style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateAreas: '"users map"',
        gridTemplateColumns: "1fr 4fr"
    }}>
        <Map ref={mapRef} />
        <Box sx={{ gridArea: 'users' }}>
            <SearchBox
                sx={{ width: '100%' }}
                onSearchTextChanged={onSearchTextChanged}
            />
            <Users
                loading={usersloading}
                users={users}
                onClick={selectUser}
            />
        </Box>
    </div>);
}

export default Main;