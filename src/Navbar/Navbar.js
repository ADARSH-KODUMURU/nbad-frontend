import React from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const navigate = useNavigate();
  const handleRouting = (route) => {
    navigate(route);
  }
  return (<>
    <Paper elevation={3} sx={{
      backgroundColor: '#12006c',
      color: 'white',
      height: '10vh',
      width: '100%',
      fontWeight: '800',
      padding: '0',
      fontSize: '40px',
      fontFamily: 'Nova Square',
      display: 'flex',
      justifyContent: 'space-Between',
      alignItems: 'center'
    }}>
      {!props.loginPage && <span className='navBarActions'>
        <div className="routeAction"
          onClick={() => handleRouting('/')}>
          Dashboard</div>
        <div className="routeAction"
          onClick={() => handleRouting('/addExpense')}>
          Expense
        </div>
        <div className="routeAction"
          onClick={() => handleRouting('/addBudget')}>
          Budget
        </div>
        <div>
          <Button variant='contained'
            sx={{
              backgroundColor: '#fa6166',
              color: 'white',
              fontFamily: 'Nova Square',
            }}
            onClick={() => {
              navigate('/register');
              localStorage.clear();
            }}
          >
            LOGOUT
          </Button>
        </div>
      </span>}
      <span style={{ margin: '0 30px 0 0' }}>
        {props.title}
      </span>

    </Paper>
  </>)
}

export default Navbar;