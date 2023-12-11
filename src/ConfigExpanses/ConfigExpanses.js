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
import dayjs from "dayjs";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fce77e59",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fa6166",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
        <Paper
          className="expansesFormContainer"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "97%",
          }}
          elevation={3}
        >
          <div
            className="upperExpenseFields"
            style={{
              width: "98%",
              margin: "20px 0 10px 0",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Description"
              type="text"
              multiline
              maxRows={3}
              placeholder="Description"
              sx={{ width: "70vw" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              sx={{ padding: 0 }}
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  onChange={(e) => handleDate(e)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div
            className="expenseLowerFields"
            style={{
              width: "100%",
              padding: "0 20px",
            }}
          >
            <FormControl sx={{ width: "20%", padding: "0 17px" }}>
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
              sx={{ width: "15%" }}
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
          </div>
        </Paper>
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
                  <TableHead className="tableHeader">
                    <TableRow sx={{ backgroundColor: "#fa6166" }}>
                      <StyledTableCell>Catagory</StyledTableCell>
                      <StyledTableCell>Expanses</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tabelBody">
                    {(filterActive ? filterData : expansesData).map((data) => {
                      // console.log(data);
                      return (
                        <StyledTableRow
                        // key={data.selectedCatagory}
                        >
                          <StyledTableCell>
                            {data.selectedCategory}
                          </StyledTableCell>
                          <StyledTableCell>{data.amountSpent}</StyledTableCell>
                          <StyledTableCell>{data.description}</StyledTableCell>
                          <StyledTableCell>
                            {new Date(data.date).toISOString().split("T")[0]}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Button
                              varient="contained"
                              sx={{
                                backgroundColor: "#fa6166",
                                color: "white",
                              }}
                              onClick={() => handleExpenseDelete(data._id)}
                            >
                              DELETE
                            </Button>
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
