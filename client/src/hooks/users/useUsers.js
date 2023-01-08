import axios from 'axios';
import { useEffect, useState } from 'react';

const useUsers = ({ filter }) => {

    const [users, setUsers] = useState([]);
    const [usersloading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState(null);

    const filteredUsers = filter ? users?.filter(user => user.name.toLowerCase().includes(filter.toLowerCase())) : users;
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

    return { users: filteredUsers, usersloading, usersError };
}

export default useUsers;