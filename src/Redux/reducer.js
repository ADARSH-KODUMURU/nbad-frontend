
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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  refreshToke: '',
  ussToken: '',
  activeUserDetails: {
    username: '',
    email: '',
    _id: '',
    refreshToken: '',
  },
  isLoading: true,
  userRegistrationSuccessful: false,
  isUserLoggedIn: false,
  budgetsData: {},
  expensesData: [],
  barChartExpnesesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SUBMIT_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SUBMIT_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: true,
        ussToken: token,
        activeUserDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case SUBMIT_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: false,
      }
    }
    case HANDLE_LOGOUT: {
      localStorage.clear();
      debugger
      return {
        ...state,
        isUserLoggedIn: false,
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGIN_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGIN_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        isLoading: false,
        isUserLoggedIn: true,
        userRegistrationSuccessful: true,
        ussToken: token,
        activeUserDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case LOGIN_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: false,
      }
    }
    case ADD_BUDGET: {
      return {
        ...state,
      }
    }
    case ADD_BUDGET_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ADD_BUDGET_FULFILLED: {
      toast.success(JSON.stringify(action.payload))
      return {
        ...state,
      }
    }
    case ADD_BUDGET_REJECTED: {
      toast.error('Could not add Budget!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    case GET_BUDGET: {
      return {
        ...state,
      }
    }
    case GET_BUDGET_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_BUDGET_FULFILLED: {
      const budgets = action.payload;
      if (budgets[0]) {
        console.log('------------', budgets[0])

        return {
          ...state,
          budgetsData: { ...state.budgetsData, ...budgets[0] },
        }
      }
      else {
        return {
          ...state,
          budgetsData: null,
        }
      }

    }
    case GET_BUDGET_REJECTED: {
      toast.error('Could not get Budgets!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }

    case ADD_CATEGORY: {
      return {
        ...state,
      }
    }
    case ADD_CATEGORY_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ADD_CATEGORY_FULFILLED: {
      toast.success('Category Added!!',
        {
          position: toast.POSITION.BOTTOM_LEFT
        });

      return {
        ...state,
      }

    }
    case ADD_CATEGORY_REJECTED: {
      toast.error('Could not add Category!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    case ADD_EXPENSE: {
      return {
        ...state,
      }
    }
    case ADD_EXPENSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ADD_EXPENSE_FULFILLED: {
      toast.success('Expense Created!!', {
        position: toast.POSITION.BOTTOM_LEFT
      });

      return {
        ...state,
      }

    }
    case ADD_EXPENSE_REJECTED: {
      toast.error('Could not add Expense!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    case GET_EXPENSE: {
      return {
        ...state,
      }
    }
    case GET_EXPENSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_EXPENSE_FULFILLED: {
      const data = action.payload
      // debugger
      console.log(data)

      return {
        ...state,
        expensesData: data,
      }

    }
    case GET_EXPENSE_REJECTED: {
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
      }
    }
    case DELETE_EXPENSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case DELETE_EXPENSE_FULFILLED: {
      toast.success('Expense Deleted Successfully!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      })
      return {
        ...state,
      }

    }
    case DELETE_EXPENSE_REJECTED: {
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }

    case DELETE_CATEGORY: {
      return {
        ...state,
      }
    }
    case DELETE_CATEGORY_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case DELETE_CATEGORY_FULFILLED: {
      toast.success('Category Deleted Successfully!!!', {
        position: toast.POSITION.BOTTOM_LEFT
      })
      return {
        ...state,
      }

    }
    case DELETE_CATEGORY_REJECTED: {
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    case GET_EXPESES_AND_DATE: {
      return {
        ...state,
      }
    }
    case GET_EXPESES_AND_DATE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_EXPESES_AND_DATE_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        barChartExpnesesData: data,
      }
    }
    case GET_EXPESES_AND_DATE_REJECTED: {
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }

    case GET_REFRESH_TOKEN: {
      return {
        ...state,
      }
    }
    case GET_REFRESH_TOKEN_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_REFRESH_TOKEN_FULFILLED: {
      const {token} = action.payload;
      console.log(token)
      localStorage.setItem('TOKEN', token);
      toast.success('Recieved Refresh Token!!!', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
      return {
        ...state,
      }
    }
    case GET_REFRESH_TOKEN_REJECTED: {
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return {
        ...state,
      }
    }
    default: return state;
  };
};

export default reducer;