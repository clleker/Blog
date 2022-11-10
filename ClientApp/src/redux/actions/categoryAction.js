import * as actionTypes from "./actionTypes";
import * as apiCategory from "../../api/category-api";

export const getCategoriesSuccess = (categories) => ({
    type:actionTypes.GET_CATEGORIES_SUCCESS,
    payload:categories                       
  }) 
  
  export const getCategories = () => {
    return function(dispatch){
        apiCategory.getList().then((result) => {
            dispatch(getCategoriesSuccess(result.data));
          });
        }
  }