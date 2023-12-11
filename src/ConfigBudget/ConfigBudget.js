import React, { useState } from 'react';
import './ConfigBudget.css';
import {
  Paper,
  TextField,
} from '@mui/material';
import Navbar from '../Navbar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './ConfigBudget.css';

const ConfigBudget = (props) => {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  


  return (<>
    <div className='congigBudgetMasterContainer'>
      <Navbar title={'SPECIFY YOUR BUDGET'}></Navbar>
      <Paper
        style={{
          height: '90vh',
          width: '100vw',
          fontFamily: 'Nova Square'
        }}
        elevation={10}>

        <TextField
          type='number'
          value={monthlyBudget}
          placeholder='Enter a monthly budget'
          onChange={(e) => setMonthlyBudget(e.target.value)}
          className='monthlyInputTag'
        />
      </Paper>
    </div>
    </>);
}

export default ConfigBudget;