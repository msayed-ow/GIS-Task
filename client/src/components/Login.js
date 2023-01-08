import { TextField, Button, Paper, Checkbox, FormControlLabel, Stack, Avatar, Grid, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { red, grey } from '@mui/material/colors';
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const paperStyle = { padding: 40, height: '50vh', width: 280, margin: '100px auto', alignItems: "center", textAlign: "center", verticalAlign: "middle" }

    const loginWithEmail = async (email, password) => {
        setIsLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/authorization/login', {
                email: email,
                password: password
            })
            navigate("/Main")
        } catch (error) {

            setErrorMsg(error.response.data.error)
            setIsLoading(false)
        }

    }

    return (
        <Stack>
            <Paper elevation={10} style={paperStyle} >
                <Grid width={1} display="flex" justifyContent="center">
                    <Avatar sx={{ background: grey[100] }}><LockIcon sx={{ color: red[800] }} /></Avatar>
                </Grid>
                <Typography sx={{ marginBlock: 2 }}>Login</Typography>
                <TextField label="Email" type={"email"} sx={{ marginBottom: 2 }} fullWidth required onChange={event => setEmail(event.target.value)} />
                <TextField label="Password" type={"password"} fullWidth required onChange={event => setPassword(event.target.value)} />
                <FormControlLabel sx={{ width: 1, marginTop: 2, marginBottom: 2 }} control={<Checkbox name='checked' />} label="Remember Me" ></FormControlLabel>
                <Button sx={{
                    color: red[800], '&:hover': {
                        backgroundColor: grey[100],
                    }
                }} onClick={() => loginWithEmail(email, password)} fullWidth >Login</Button>
                {isLoading && <CircularProgress sx={{ marginBlock: 2, color: red[800] }} />}
                {errorMsg && !isLoading && <Typography sx={{ marginBlock: 2, fontSize: 10, color: red[800] }}>{errorMsg}</Typography>}
            </Paper>
        </Stack>
    )
}



export default Login;