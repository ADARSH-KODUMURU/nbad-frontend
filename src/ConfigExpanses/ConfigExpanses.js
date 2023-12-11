import React, { useEffect, useState } from "react";
import "./ConfigExpanses.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Navbar from "../Navbar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#424bf995",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    color: 'black'
    
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#12006c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'black'
  },
}));

const today = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  day: "numeric",
  month: "short",
  year: "numeric",
};

const ConfigExpanses = (props) => {
  // debugger
  const [description, setDescription] = useState("");
  const [amountSpent, setAmountSpent] = useState(0);
  const [expansesData, setExpansesData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState("");

  const [filterCatagoryName, setFilterCatagoryName] = useState("All");
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const [catagoryList, setCatagoryList] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const date = today.toLocaleString("en-US", options);

  const {
    budgetsData,
    getBudgetData,
    addExpense,
    getExpenses,
    expensesData,
    deleteExpense,
  } = props;

  useEffect(() => {
    console.log("-----------", expensesData);
    if (expensesData.length > 0) {
      const newArray = expensesData.map((item) => ({
        amountSpent: item.amount,
        date: item.date,
        description: item.description,
        _id: item._id,
        selectedCategory: item.categoryName,
      }));
      setExpansesData(newArray);
    }
  }, [expensesData]);
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        await getBudgetData();
        await getExpenses(selectedCatId);
      } catch (er) {
        alert("Something went Wrong", er.message);
      }
    };
    fetchBudgetData();
  }, []);

  useEffect(() => {
    // console.log('=========',budgetsData)
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      setCatagoryList(budgetsData.categories);
    }
    // console.log(catagoryList)
  }, [budgetsData]);

  const handleExpanses = async () => {
    try {
      await addExpense(description, amountSpent, selectedCatId, selectedDate);
      const newData = [
        {
          amountSpent,
          description,
          selectedCatagory,
          date,
        },
      ];
      const newObj = [...expansesData, ...newData];
      setFilterActive(false);
      setExpansesData(newObj);
      setCategoryObj({});
      setAmountSpent("");
      setDescription("");
    } catch (er) {
      alert("Something went Wrong!!!");
    }
  };

  const handleFilter = (e) => {
    setFilterCatagoryName(e.target.value);
    if (e.target.value === "All") {
      setFilterActive(false);
      setFilterData(expansesData);
    } else {
      let filteredArray;
      setFilterActive(true);
      filteredArray = expansesData.filter(
        (obj) => obj.selectedCategory === e.target.value
      );
      setFilterData(filteredArray);
      console.log(filteredArray, filterActive);
    }
  };

  const [categoryObj, setCategoryObj] = useState({});
  const handleCategorySelection = (category) => {
    setSelectedCatagory(category.name);
    setSelectedCatId(category._id);
    setCategoryObj(category);
  };

  const handleExpenseDelete = async (_id) => {
    try {
      await deleteExpense(_id);
    } catch (err) {
      alert("Error deleting expense");
    }
  };

  const handleDate = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    console.log(formattedDate);
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <div className="masterEpansesContainer">
        <Navbar title={"Config Expanses"} />
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
          <Paper
            className="expansesFormContainer"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
              height: '50vh',
              padding: '20px'
            }}
            elevation={3}
          >
            <TextField
              required
              id="outlined-required"
              label="Description"
              type="text"
              multiline
              maxRows={3}
              placeholder="Description"
              sx={{ width: "50vw" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={{ width: '50vw', display: 'flex', justifyContent: 'start', margin: '10px 0px'}}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                sx={{ padding: 0, width: '50vw' }}
              >
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date picker"
                    onChange={(e) => handleDate(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <FormControl sx={{ width: "50vw", padding: "0 17px", margin: '20px 0px' }}>
              <InputLabel
                sx={{ paddingLeft: "17px" }}
                id="demo-simple-select-label"
              >
                Catagory
              </InputLabel>
              <Select
                value={categoryObj}
                label="Catagory"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => handleCategorySelection(e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                {catagoryList.length > 0 &&
                  catagoryList.map((catagory) => {
                    return (
                      <MenuItem value={catagory}>{catagory.name}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Amount Spent"
              type="number"
              placeholder="Amount Spent"
              sx={{ width: "50vw", margin: '10px 0px' }}
              value={amountSpent}
              onChange={(e) => setAmountSpent(e.target.value)}
            />
            <Button
              className="addbuttonCont"
              varient="contained"
              sx={{ backgroundColor: "#424cf9", color: "white" }}
              onClick={() => handleExpanses()}
            >
              ADD EXPENSE
            </Button>
          </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <FormControl
            sx={{
              margin: "10px 20px",
              width: "14%",
              backgroundColor: "#ffffff8f",
              borderRadius: "10px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Catagory Filter</InputLabel>
            <Select
              value={filterCatagoryName}
              label="Catagory"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => handleFilter(e)}
              inputProps={{ "aria-label": "Without label" }}
            >
              {catagoryList.map((catagory) => {
                return <MenuItem value={catagory.name}>{catagory.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="tableContainerExp">
          {(filterActive ? filterData : expansesData).length <= 0 ? (
            <Paper elevation={3} className="noDataMessageForExp">
              {filterData.length === 0
                ? `No Expanses Present`
                : `Please Enter Some Data!!`}
            </Paper>
          ) : (
            <div className="expanseTable">
              <TableContainer
                sx={{ width: "100%", fontFamily: "Nova Square" }}
                className="pieChartExpConfigCont"
                component={Paper}
              >
                <Table
                  sx={{ minWidth: 650, height: "100%" }}
                  aria-label="simple table"
                >
                  <TableHead sx={{ backgroundColor: "#12006c !important" }} className="tableHeader">
                    <TableRow sx={{ backgroundColor: "rgb(18,0,108) !important" }}>
                      <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: 'Nova Square', fontWeight: '700', fontSize: '20px' }}>Catagory</StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: 'Nova Square', fontWeight: '700', fontSize: '20px' }}>Expanses</StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: 'Nova Square', fontWeight: '700', fontSize: '20px' }}>Description</StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: 'Nova Square', fontWeight: '700', fontSize: '20px' }}>Date</StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: 'Nova Square', fontWeight: '700', fontSize: '20px' }}>Remove Expense</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tabelBody">
                    {(filterActive ? filterData : expansesData).map((data) => {
                      // console.log(data);
                      return (
                        <StyledTableRow
                        // key={data.selectedCatagory}
                        >
                          <StyledTableCell sx={{ fontFamily: 'Nova Square' }}>
                            {data.selectedCategory}
                          </StyledTableCell>
                          <StyledTableCell sx={{ fontFamily: 'Nova Square' }}>{data.amountSpent}</StyledTableCell>
                          <StyledTableCell sx={{ fontFamily: 'Nova Square' }}>{data.description}</StyledTableCell>
                          <StyledTableCell sx={{ fontFamily: 'Nova Square' }}>
                            {new Date(data.date).toISOString().split("T")[0]}
                          </StyledTableCell>
                          <StyledTableCell sx={{ fontFamily: 'Nova Square' }}>
                            <span style={{ cursor: 'pointer' }} onClick={() => handleExpenseDelete(data._id)}>
                              <DeleteIcon style={{ color: 'red' }} />
                            </span>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigExpanses;
