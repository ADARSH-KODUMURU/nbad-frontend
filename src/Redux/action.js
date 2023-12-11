import {
  SUBMIT_USER,
  SUBMIT_USER_FULFILLED,
  SUBMIT_USER_PENDING,
  SUBMIT_USER_REJECTED,
  LOGIN_USER,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  ADD_BUDGET,
  ADD_BUDGET_FULFILLED,
  ADD_BUDGET_PENDING,
  ADD_BUDGET_REJECTED,
  GET_BUDGET,
  GET_BUDGET_FULFILLED,
  GET_BUDGET_PENDING,
  GET_BUDGET_REJECTED,
  ADD_CATEGORY,
  ADD_CATEGORY_PENDING,
  ADD_CATEGORY_FULFILLED,
  ADD_CATEGORY_REJECTED,
  ADD_EXPENSE,
  ADD_EXPENSE_PENDING,
  ADD_EXPENSE_FULFILLED,
  ADD_EXPENSE_REJECTED,
  GET_EXPENSE,
  GET_EXPENSE_PENDING,
  GET_EXPENSE_FULFILLED,
  GET_EXPENSE_REJECTED,
  DELETE_EXPENSE,
  DELETE_EXPENSE_PENDING,
  DELETE_EXPENSE_FULFILLED,
  DELETE_EXPENSE_REJECTED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_FULFILLED,
  DELETE_CATEGORY_REJECTED,
  GET_EXPESES_AND_DATE,
  GET_EXPESES_AND_DATE_PENDING,
  GET_EXPESES_AND_DATE_FULFILLED,
  GET_EXPESES_AND_DATE_REJECTED,
  GET_REFRESH_TOKEN,
  GET_REFRESH_TOKEN_PENDING,
  GET_REFRESH_TOKEN_FULFILLED,
  GET_REFRESH_TOKEN_REJECTED,
  HANDLE_LOGOUT,
} from './actionTypes';

import Axios from '../Services/Services'

export const submitUser = (username, email, password,navigate) => {
  const data = {
    name: username,
    email: email,
    password: password,
  };

  return (dispatch) => {
    dispatch({ type: SUBMIT_USER_PENDING });
    Axios.post('/auth/register', data)
      .then((res) => {
        dispatch({ type: SUBMIT_USER_FULFILLED, payload: res.data });
        navigate('/')
      })
      .catch((error) => {
        dispatch({ type: SUBMIT_USER_REJECTED, payload: error?.response?.data?.message })
      });
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_LOGOUT, });
  }
}

export const loginUser = (email, password, navigate) => {
  const data = {
    email,
    password,
  }
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_PENDING });

    Axios.post('/auth/login', data)
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: LOGIN_USER_FULFILLED, payload: res.data });
        navigate('/');
      })
      .catch((err) => {
        dispatch({ type: LOGIN_USER_REJECTED, payload: err?.response?.data?.message });
      });
  };
}

export const getBudgetData = () => {
  return (dispatch) => {
    dispatch({ type: GET_BUDGET_PENDING });
    Axios.get('/budget/getAllBudgets')
    .then(res => {
      console.log(res.data)
       dispatch({ type: GET_BUDGET_FULFILLED, payload: res.data});
    })
    .catch((err) => {
       dispatch({ type: GET_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
};


export const addBudgetData = (budgetName, totalAmount, catagories) => {
  
  const catagoriesArray = Object.entries(catagories).map(([name, amount]) => ({
    name,
    amount,
  }));
  
  // const today = new Date();
  // const formattedDate = today.toISOString().slice(0, 10);
  // const nextMonth = new Date(today);
  // nextMonth.setMonth(today.getMonth() + 1);

  // const formattedNextMonthDate = nextMonth.toISOString().slice(0, 10);
  const data = {

    budget: {
      name: budgetName,
      categories: catagoriesArray,
      totalAmount,

    }
  }

  // const budget = {
  // }
  // console.log(data)
  return (dispatch) => {
    dispatch({ type: ADD_BUDGET_PENDING });
    Axios.post('/budget/createBudget', data)
    .then((res) => {
      dispatch({ type: ADD_BUDGET_FULFILLED, payload: res.data });
      dispatch(getBudgetData());
    })
    .catch(err => {
      dispatch({ type: ADD_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
}

export const createCatgory = (name,allocatedAmount,budgetId) => {
  const data = {
    name,
    allocatedAmount,
    budgetId
  }
  return (dispatch) => {
    dispatch({ type: ADD_CATEGORY_PENDING })
    Axios.post('/budget/addCategoryToBudget', data)
    .then((res) => {
      dispatch({ type: ADD_CATEGORY_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_CATEGORY_REJECTED, payload: err?.response?.data?.message })
    })
  }
}


export const getAllExpensesAndDate = () => {
  return (dispatch) => {
    dispatch({ type: GET_EXPESES_AND_DATE_PENDING });
    Axios.get('/budget/getAllUserExpensesSortedByDate')
    .then(res => {
      dispatch({ type: GET_EXPESES_AND_DATE_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_EXPESES_AND_DATE_REJECTED, payload: err.response?.data?.message });
    });
  };
};

export const getAccessToken = () => {
  const data = {
    refreshToken: localStorage.getItem('REF_TOKEN'),
  }
  console.log(data);
  return (dispatch) => {
    dispatch({ type: GET_REFRESH_TOKEN_PENDING })
    Axios.post('/auth/getAcessToken', data)
    .then(res => {
      dispatch({ type: GET_REFRESH_TOKEN_FULFILLED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_REFRESH_TOKEN_REJECTED, payload: err.response?.data?.message })
    })
  }
}


export const getExpenses = (categoryId) => {

  return (dispatch) => {
    // const { expensesData } = getState();
    // console.log(expensesData)
    dispatch({ type: GET_EXPENSE_PENDING });
    Axios.get('/budget/getAllUserExpense')
    .then(res => {
      dispatch({ type: GET_EXPENSE_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_EXPENSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const deleteCategory = (_id) => {
  const data = {
    categoryId: _id,
  }
  return (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_PENDING });
    Axios.post('/budget/deleteCategory', data)
    .then(res => {
      dispatch({ type: DELETE_CATEGORY_FULFILLED, payload: res.data });
      dispatch(getBudgetData());
    })
    .catch(err => {
      dispatch({ type: DELETE_CATEGORY_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const deleteExpense = (_id) => {
  const data = {
    expenseId: _id,
  }
  return (dispatch) => {
    dispatch({ type: DELETE_EXPENSE_PENDING });
    Axios.post('/budget/deleteExpense', data)
    .then(res => {
      dispatch({ type: DELETE_EXPENSE_FULFILLED, payload: res.data });
      dispatch(getExpenses());
    })
    .catch(err => {
      dispatch({ type: DELETE_EXPENSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}


export const addExpense = (description, amount, categoryId, date) => {
  const data = {
    description,
    amount,
    categoryId,
    date,
  }
  return (dispatch) => {
    dispatch({ type: ADD_EXPENSE_PENDING })
    Axios.post('/budget/addExpense', data)
    .then(res => {
      dispatch({ type: ADD_EXPENSE_FULFILLED, payload: res.data });
      dispatch(getExpenses());
    })
    .catch(err => {
      dispatch({ type: ADD_EXPENSE_REJECTED, payload: err?.response?.data?.message });
    })
  }
}