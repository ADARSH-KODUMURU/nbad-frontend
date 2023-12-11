import React, { useEffect, useState } from 'react';
import './ExpanseConfig.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fce77e59',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffbe7c',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const today = new Date();

const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

const ExpanseConfig = () => {
  const [description, setDescription] = useState('');
  const [amountSpent, setAmountSpent] = useState(0);
  const [expansesData, setExpansesData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState('');

  const [filterCatagoryName, setFilterCatagoryName] = useState('All')
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const date = today.toLocaleString('en-US', options);
  const catagories = [
    'All',
    'Ab1',
    'Ab2',
    'Ab3',
    'Ab4',
  ]
  const handleExpanses = () => {
    const newData = [{
      amountSpent,
      description,
      selectedCatagory,
      date,
    }];
    const newObj = [...expansesData, ...newData];
    setFilterActive(false);
    setExpansesData(newObj);
  }

  const handleFilter = (e) => {
    setFilterCatagoryName(e.target.value)
    if (e.target.value === 'All') {
      setFilterActive(false);
      setFilterData(expansesData);
    } else {
      let filteredArray;
      setFilterActive(true);
      filteredArray = expansesData.filter(obj => obj.selectedCatagory === e.target.value);
      setFilterData(filteredArray);
      console.log(filteredArray, filterActive)
    }
  };

  return (<>
    <div className="masterEpanses">
      <Paper elevation={3} sx={{ backgroundColor: '#ffa252', color: 'white' }} className='expansesHeader'>
        EXPANSES
      </Paper>
      <Paper className='pageContainer'>
        <Paper className='expansesForm' sx={{ backgroundColor: '#ffbe7c' }} elevation={3}>
          <div className="formUpper">
            <TextField
              required
              id="outlined-required"
              label="Expanse Description"
              type='text'
              variant="filled"
              multiline
              maxRows={3}
              placeholder='Expanse Description'
              sx={{ width: '100%', backgroundColor: 'white', fontFamily: 'Nova Square, sans-serif', borderRadius: '10px'}}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="formLower">
            <FormControl className='catagorySelect' sx={{ width: '50%', backgroundColor: 'white', borderRadius: '10px' }}>
              <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
              <Select
                value={selectedCatagory}
                label='Catagory'
                variant="filled"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setSelectedCatagory(e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                // sx={{ color: 'white' }}
                
              >
                {catagories.map((catagory) => {
                  return <MenuItem  value={catagory}>{catagory}</MenuItem>
                })}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Amount Spent"
              variant="filled"
              type='number'
              placeholder='Amount Spent'
              sx={{ width: '50%', backgroundColor: 'white', borderRadius: '10px' }}
              onChange={(e) => setAmountSpent(e.target.value)}
             
            />
          </div>
          <div className="addButtonAndFilter">
            <div className="addbuttonCont" onClick={() => handleExpanses()}>
              <Button variant="contained" className='addButtonExp' sx={{ backgroundColor: 'white', color: 'black', height: '50px', width: '200px', fontSize: '17px' }}>Add Expanse</Button>
            </div>

            <FormControl variant='filled' sx={{ color: 'white', margin: '10px 20px', width: '25%', backgroundColor: 'white', borderRadius: '10px' }}>
              <InputLabel id="demo-simple-select-label" >Catagory Filter</InputLabel>
              <Select
                value={filterCatagoryName}
                label='Catagory'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => handleFilter(e)}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {catagories.map((catagory) => {
                  return <MenuItem sx={{ color: 'white' }} value={catagory}>{catagory}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
          <div className="subHeader">
            Budget Left Vs Budget for the Month :
          </div>
          <div className='totalBudgetForMonth'>
            1234/7000
          </div>
        </Paper>
        
        <div className="tableExp">
          {(filterActive ? filterData : expansesData).length <= 0 ? <Paper elevation={3} className='noDataMessageForExp'>
            {filterData.length === 0 && filterActive ? `No Expanses Present for catagory ${filterCatagoryName}` : `Please Enter Some Data!!`}</Paper> :
            <div className='expTable'>
              <TableContainer sx={{ width: '100%', fontSize: '16px' }} className='tableExpConfigCont' component={Paper}>
                <Table sx={{ minWidth: 650, height: '100%' }} aria-label="simple table">
                  <TableHead className='tableHeader'>
                    <TableRow sx={{ backgroundColor: '#fa6166' }}>
                      <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }}>Catagory</StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }}>Expanses</StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }}>Description</StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }}>Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className='tabelBody'>
                    {
                      (filterActive ? filterData : expansesData).map((data) => {
                        // console.log(data);
                        return <StyledTableRow
                        // key={data.selectedCatagory}
                        >
                          <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }}>{data.selectedCatagory}</StyledTableCell >
                          <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }} >{data.amountSpent}</StyledTableCell >
                          <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }} >{data.description}</StyledTableCell >
                          <StyledTableCell sx={{ fontFamily: 'Nova Square, sans-serif' }} >{data.date}</StyledTableCell >
                        </StyledTableRow>
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
        </div>
      </Paper>
    </div>
  </>);
};

export default ExpanseConfig;