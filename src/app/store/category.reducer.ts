import {
  CodePulseActions,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  GET_LOAD_CATEGORY,
  GET_LOAD_CATEGORY_FAILURE,
  GET_LOAD_CATEGORY_SUCCESS,
  GET_LOAN_CATEGORY_BY_ID,
  GET_LOAN_CATEGORY_BY_ID_FAILURE,
  GET_LOAN_CATEGORY_BY_ID_SUCCESS,
  LOAD_CATEGORY,
  LOAD_CATEGORY_FAILURE,
  LOAD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
} from './category.actions';
import { CodePulseStoreState } from './category.types';

const initialState: CodePulseStoreState = {
  categoryStore: {
    loading: false,
    loaded: false,
    data: undefined,
    errorMessage: undefined,
  },
  getcategoryStore: {
    loading: false,
    loaded: false,
    data: undefined,
    errorMessage: undefined,
  },
  getcategorybyidStore: {
    loading: false,
    loaded: false,
    data: undefined,
    errorMessage: undefined,
  },
  updatecategoryStore: {
    loading: false,
    loaded: false,
    data: undefined,
    errorMessage: undefined,
  },
  deletecategoryStore: {
    loading: false,
    loaded: false,
    data: undefined,
    errorMessage: undefined,
  },
};

export function CodePulseReducer(
  state = initialState,
  action: CodePulseActions,
): CodePulseStoreState {
  switch (action.type) {
    case LOAD_CATEGORY:
      return {
        ...state,
        categoryStore: {
          ...state.categoryStore,
          loading: true,
          loaded: false,
          errorMessage: undefined,
        },
      };

    case LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryStore: {
          data: action.categoryResponse,
          loading: false,
          loaded: true,
          errorMessage: undefined,
        },
      };
    case LOAD_CATEGORY_FAILURE:
      return {
        ...state,
        categoryStore: {
          ...state.categoryStore,
          loading: false,
          loaded: false,
          errorMessage: action.error,
        },
      };
    case GET_LOAD_CATEGORY:
      return {
        ...state,
        getcategoryStore: {
          ...state.getcategoryStore,
          loading: true,
          loaded: false,
          errorMessage: undefined,
        },
      };
    case GET_LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        getcategoryStore: {
          data: action.categories,
          loading: false,
          loaded: true,
          errorMessage: undefined,
        },
      };
    case GET_LOAD_CATEGORY_FAILURE:
      return {
        ...state,
        getcategoryStore: {
          ...state.getcategoryStore,
          loading: false,
          loaded: false,
          errorMessage: action.error,
        },
      };
    case GET_LOAN_CATEGORY_BY_ID:
      return {
        ...state,
        getcategorybyidStore: {
          ...state.getcategorybyidStore,
          loaded: false,
          loading: true,
          errorMessage: undefined,
        },
      };
    case GET_LOAN_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        getcategorybyidStore: {
          ...state.getcategorybyidStore,
          data: action.category,
          loaded: true,
          loading: false,
          errorMessage: undefined,
        },
      };
    case GET_LOAN_CATEGORY_BY_ID_FAILURE:
      return {
        ...state,
        getcategorybyidStore: {
          ...state.getcategorybyidStore,
          loaded: false,
          loading: false,
          errorMessage: action.error,
        },
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updatecategoryStore: {
          ...state.updatecategoryStore,
          loading: true,
          loaded: false,
          errorMessage: undefined,
        },
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updatecategoryStore: {
          ...state.updatecategoryStore,
          data: action.category,
          loading: false,
          loaded: true,
          errorMessage: undefined,
        },
      };
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        updatecategoryStore: {
          ...state.updatecategoryStore,
          loading: false,
          loaded: false,
          errorMessage: action.error,
        },
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        deletecategoryStore: {
          ...state.deletecategoryStore,
          loading: true,
          loaded: false,
          errorMessage: undefined,
        },
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deletecategoryStore: {
          ...state.deletecategoryStore,
          loading: false,
          loaded: true,
          data: action.categoryResponse,
          errorMessage: undefined,
        },
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        deletecategoryStore: {
          ...state.deletecategoryStore,
          loading: true,
          loaded: false,
          errorMessage: action.error,
        },
      };
    default:
      return state;
  }
}
