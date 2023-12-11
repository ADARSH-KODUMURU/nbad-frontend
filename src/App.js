import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Login";
import HomePage from "./HomePage";
import ConfigureBudget from "./ConfigureBudget";
import ConfigExpanses from "./ConfigExpanses";
import "./App.css";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { getAccessToken } from "./Redux/action";

function App(props) {
  const { getAccessToken, isUserLoggedIn } = props;
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isUserLoggedIn && localStorage.getItem("TOKEN")) setOpenDialog(true);
    }, 120000);

    return () => clearInterval(intervalId);
  }, [isUserLoggedIn]);

  const handleDialogClose = async () => {
    try {
      await getAccessToken();
      setOpenDialog(false);
    } catch (err) {
      alert("Something Went Wrong!!!");
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Login />} />
          <Route path="/addBudget" element={<ConfigureBudget />} />
          <Route path="/addExpense" element={<ConfigExpanses />} />
        </Routes>
      </Router>
      <Dialog open={openDialog}>
        <DialogTitle>Click below Button to get Refresh Token!!!</DialogTitle>
        <DialogActions>
          <Button varient="contained" onClick={() => handleDialogClose()}>
            GET REFRESH TOKEN
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(getAccessToken()),
});

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
