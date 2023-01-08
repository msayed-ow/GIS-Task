import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { red } from '@mui/material/colors';

const Users = ({ loading, users,selectedUserID, onClick }) => {

    return loading ?
        <CircularProgress />
        :
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                users?.map(user => {
                    return <ListItemButton key={user.id} onClick={() => onClick(user.id, user.address.geo.lat, user.address.geo.lng)} selected={user.id === selectedUserID}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[800] }}>
                                <AccountCircleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={`@${user.username} - ${user.age}yrs`} />
                    </ListItemButton>
                })}

        </List>
}

export default Users