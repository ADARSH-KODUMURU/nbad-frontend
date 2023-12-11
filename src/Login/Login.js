import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [signUpPage, setSignupPage] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  // debugger
  const {
    loginUser,
    submitUser,
  } = props;


  const handleLogin = async () => {
    try {
      await loginUser(email, password, navigate);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  const handleSignup = async () => {
    try {
      await submitUser(username, email, password, navigate);
    } catch (err) {
      alert('Something Went Wrong')
    }
  };
  return (
    <div>
      <Navbar title={'MANAGE YOUR BUDGET AND EXPANSES HERE'} loginPage={true}/>
      <Container className="login-container">
        {<Paper elevation={30} className="login-paper">
          <Typography sx={{ color: 'white', fontSize: '40px', fontFamily: 'Nova Square', height: '60px' }} variant="h5" gutterBottom>
            {signUpPage ? `Sign Up` : `Login`}
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            className="login-textfield"
            value={email}
            sx={{ width: '70%', backgroundColor: 'white' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          {
            signUpPage && <TextField
              label="Username"
              variant="filled"
              className="login-textfield"
              value={username}
              sx={{ width: '70%', backgroundColor: 'white' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          }
          <TextField
            label="Password"
            type="password"
            variant="filled"
            className="login-textfield"
            value={
              password}
            sx={{ width: '70%', backgroundColor: 'white' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="login-button"
            onClick={() => signUpPage ? handleSignup() : handleLogin()}
          >
            {signUpPage ? `Sign Up` : `Login`}
          </Button>
          {

            <div
              className='switchSignupSigninText'
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => setSignupPage(!signUpPage)}
            >{signUpPage ? `Don't have an account!! Signup here` : `Already have an account!! Signin here`}</div>
          }
        </Paper>}
      </Container>
    </div>

  );
};

export default Login;
