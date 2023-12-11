import React, { useEffect, useState } from "react";
import "./ConfigureBudget.css";
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import Chip from '@mui/material/Chip';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from "@mui/material/TableCell";
import Navbar from "../Navbar";
import {
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Chip,
  TextField,
  Paper,
  TableContainer,
} from "@mui/material";

const ConfigureBudget = (props) => {
  const [catagory, setCatagory] = useState("");
  const [chipData, setChipData] = useState({});
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [catagoryBudget, setCatagoryBudget] = useState("");
  const [calculatedAmmount, setCalculatedAmmount] = useState(0);
  const [budgetId, setBudgetId] = useState("");
  const [budgetName, setBudgetName] = useState("");

  const {
    getBudgetData,
    addBudgetData,
    budgetsData,
    createCatgory,
    deleteCategory,
  } = props;
  console.log(budgetsData);
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

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await getBudgetData();
      } catch (er) {
        alert("Something went Wrong", er.message);
      }
    };
    fetchBudgetData();
  }, []);

  useEffect(() => {
    if (budgetsData != null && Object.keys(budgetsData).length > 0) {
      setBudgetId(budgetsData._id);
      setMonthlyBudget(budgetsData.totalAmount);
      setBudgetName(budgetsData.name);
      const { categories } = budgetsData;

      const transformedObject = categories.reduce((result, item) => {
        result[item.name] = item.allocatedAmount;
        return result;
      }, {});
      setChipData(transformedObject);

      let totalCategoryAmount = 0;
      budgetsData.categories.map((cat) => {
        totalCategoryAmount += cat.allocatedAmount;
      });
      setCalculatedAmmount(totalCategoryAmount);
    }
  }, [budgetsData]);

  const handleDataSubmit = async () => {
    try {
      await addBudgetData(budgetName, monthlyBudget, chipData);
    } catch (er) {
      alert("Something went Wrong");
    }
  };

  const handleChipData = async () => {
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      try {
        await createCatgory(catagory, catagoryBudget, budgetId);
      } catch (er) {
        alert("Something went Wrong");
      }
    }
    // else {
    const newChipObject = {
      ...chipData,
      ...{ [catagory]: catagoryBudget },
    };
    setCalculatedAmmount(
      parseInt(calculatedAmmount) + parseInt(catagoryBudget)
    );
    setChipData(newChipObject);
    // }
    // handleDataSubmit();
    setCatagoryBudget("");
    setCatagory("");
  };

  const handleCategoryDelete = async (index) => {
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      const { categories } = budgetsData;
      console.log(budgetsData.categories[index]);
      try {
        await deleteCategory(categories[index]?._id);
      } catch (err) {
        alert(`Error in category deletion ${err.message}`);
      }
    }
  };
  const handleChipDelete = (chipKey, value, index) => {
    const newDataObject = Object.fromEntries(
      Object.entries(chipData).filter(([key]) => key !== chipKey)
    );
    setCalculatedAmmount(parseInt(calculatedAmmount) - parseInt(value));
    setChipData(newDataObject);
    handleCategoryDelete(index);
  };

  return (
    <>
      <div className="masterConfigureBudgetContainer">
        <Navbar title={"Configure Budget"} />
        <div className="formContainer">
          <div className="formDetailsContainer">
            <Paper elevation={4} className="configBudgetFormContainer">
              <TextField
                required
                id="outlined-required"
                label="Monthly Budget Amount"
                type="number"
                placeholder="Monthly Budget Amount"
                sx={{ width: "100%", margin: "0px 0 10px 0" }}
                disabled={budgetsData?.totalAmount}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Budget Name"
                placeholder={budgetsData?.name ? "" : "Budget Name"}
                disabled={budgetsData?.name}
                value={budgetName}
                sx={{ width: "100%", margin: "10px 0 10px 0" }}
                onChange={(e) => setBudgetName(e.target.value)}
              />
              <div className="catagoryContainer">
                <TextField
                  required
                  // disabled={budgetsData?.categories}
                  id="outlined-required"
                  label="Budget Catagory"
                  placeholder="Budget Catagory"
                  sx={{ width: "40%" }}
                  // value={}
                  // disabled={Object.keys(budgetsData).length != 0}
                  value={catagory}
                  onChange={(e) => setCatagory(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Budget Amount"
                  type="number"
                  placeholder={budgetsData?.categories ? "" : "Budget Amount"}
                  value={catagoryBudget}
                  // disabled={budgetsData?.categories}
                  sx={{ width: "30%", borderColor: "#1976d2" }}
                  onChange={(e) => setCatagoryBudget(e.target.value)}
                />
                <Button
                  varient="contained"
                  sx={{
                    width: "30%",
                    backgroundColor: "#424cf9",
                    color: "white",
                    fontFamily: "Nova Square",
                  }}
                  className="addIcon"
                  title="Add Catagory"
                  onClick={() => handleChipData()}
                >
                  ADD CATAGORY
                </Button>
              </div>
              <div
                className="addBudgetButton"
                title="Create Budget"
                onClick={() => {
                  if (
                    budgetsData === null ||
                    budgetsData?.length === 0 ||
                    Object.keys(budgetsData).length === 0
                  )
                    handleDataSubmit();
                }}
              >
                <Button
                  variant="contained"
                  disabled={budgetsData?.categories}
                  sx={{ backgroundColor: "#fa6166" }}
                >
                  Submit
                </Button>
              </div>
            </Paper>
            <div className="monthlyBudgetContainer">
              <Paper className="monthlyAmountContainer" elevation={2}>
                <span className="monthlyHeader">
                  Calculated Budget Vs Monthly Budget
                </span>
                <div className="fractionContainerAmount">
                  <span className="calculateAmount">{calculatedAmmount}</span>/
                  {monthlyBudget}
                </div>
              </Paper>
            </div>
          </div>

          <TableContainer
            sx={{ width: "95vw", fontFamily: "Nova Square" }}
            className="pieChartConfigCont"
            component={Paper}
          >
            <Table
              sx={{ minWidth: 650, height: "100%" }}
              aria-label="simple table"
            >
              <TableHead className="tableHeader">
                <TableRow sx={{ backgroundColor: "#fa6166" }}>
                  <StyledTableCell sx={{ paddingLeft: "100px" }} align="left">
                    Catagory Name
                  </StyledTableCell>
                  <StyledTableCell sx={{ paddingRight: "50px" }} align="center">
                    Budget Amount
                  </StyledTableCell>
                  <StyledTableCell sx={{ paddingRight: "50px" }} align="center">
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tabelBody">
                {Object.keys(chipData).length <= 0 ? (
                  <div className="noDataMessage">Please Enter Some Data!!</div>
                ) : (
                  Object.entries(chipData).map(([key, value], index) => (
                    <StyledTableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell
                        sx={{ paddingLeft: "100px" }}
                        align="left"
                        component="th"
                        scope="row"
                      >
                        {key}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ paddingRight: "50px" }}
                        align="center"
                      >
                        {value}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ paddingRight: "50px" }}
                        align="center"
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#fa6166",
                            color: "white",
                          }}
                          onClick={() => handleCategoryDelete(index)}
                        >
                          DELETE
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ConfigureBudget;
