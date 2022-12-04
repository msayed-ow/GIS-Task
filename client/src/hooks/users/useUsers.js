import axios from 'axios';
import { useEffect, useState } from 'react';

const useUsers = ({ filter }) => {

    const [users, setUsers] = useState([]);
    const [usersloading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {

        const getUsers = async () => {

            try {

                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data.result);
            }
            catch (e) {

                setUsersError(e);
            }
            finally {

                setUsersLoading(false);
            }
        }

        getUsers();

    }, []);

    useEffect(_ => {

        if (filter) {

            var filterUsers = users?.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
            setFilteredUsers(filterUsers);
        }

        else setFilteredUsers([...users]);

    }, [users, filter]);

    return { users: filteredUsers, usersloading, usersError };
}

export default useUsers;