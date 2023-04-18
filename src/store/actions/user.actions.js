import { userService } from "../../services/user.service";
import { SET_USER } from "../reducers/user.reducer";

export function loadLoggedInUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getUser();
      const action = {
        type: SET_USER,
        user,
      };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function login(cred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(cred);
      const action = {
        type: SET_USER,
        user,
      };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function signup(cred) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(cred);
      const action = {
        type: SET_USER,
        user,
      };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function transferCoins(contact, amount) {
  return async (dispatch, getState) => {
    try {
      const updatedUser = userService.transferCoins(amount, contact);
      console.log("updatedUser: ", updatedUser);
      dispatch({ type: SET_USER, user: updatedUser });
    } catch (error) {
      console.log("error:", error);
    }
  };
}
